import { addDays } from "date-fns";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/db";
import {
	journalEntries,
	journalLines,
	memberMemberships,
	payments,
} from "@/drizzle/schema";
import { billingSettingsSchema } from "@/features/payments/services/schema";
import {
	currencyFormatter,
	dateFormat,
	internationalizePhoneNumber,
} from "@/lib/helpers";
import { inngest } from "@/lib/inngest/client";
import { sendSms } from "@/lib/sms";
import { toTitleCase } from "@/lib/utils";

export const createPayment = inngest.createFunction(
	{ id: "create-payment" },
	{ event: "app/payments.create" },
	async ({ event, step }) => {
		const {
			data: { checkoutRequestId, stkCallback },
		} = event;
		const fetchedPayment = await step.run("fetch-records", async () => {
			const payment = await db.query.payments.findFirst({
				where: (payments, { eq, and }) =>
					and(
						eq(payments.externalReference, checkoutRequestId),
						eq(payments.status, "pending"),
					),
			});
			if (!payment) {
				throw new Error("Payment request not found");
			}
			return payment;
		});

		const planDetails = await step.run("fetch-plan-details", async () => {
			const plan = await db.query.membershipPlans.findFirst({
				where: (plans, { eq }) => eq(plans.id, fetchedPayment.planId as string),
			});
			if (!plan) {
				throw new Error("Plan not found");
			}

			const membership = await db.query.memberMemberships.findFirst({
				where: (memberships, { eq }) =>
					eq(memberships.memberId, fetchedPayment.memberId),
				orderBy: (memberships, { desc }) => [desc(memberships.endDate)],
			});

			return {
				isSessionBased: plan.isSessionBased,
				startDate: new Date(fetchedPayment.paymentDate),
				endDate: plan.isSessionBased
					? null
					: addDays(new Date(fetchedPayment.paymentDate), plan.duration),
				previousPlanId: membership?.membershipPlanId,
			};
		});

		const ledgerDetails = await step.run("fetch-ledger-details", async () => {
			const settings = await db.query.settings.findFirst({
				columns: { billing: true },
			});

			const billing = billingSettingsSchema.parse(settings?.billing ?? {});

			const planId = await db.query.membershipPlans.findFirst({
				columns: { revenueAccountId: true },
				where: (plans, { eq }) => eq(plans.id, fetchedPayment.planId as string),
			});

			const bankId = await db.query.ledgerAccounts.findFirst({
				columns: { id: true },
				where: (accounts, { eq }) =>
					eq(sql`lower(${accounts.name})`, "cash at bank"),
			});

			return {
				vatAccountId: billing.vatAccountId,
				revenueAccountId: planId?.revenueAccountId as number,
				bankAccountId: bankId?.id ?? 2,
			};
		});

		const callbackMetadata = stkCallback.CallbackMetadata?.Item || [];
		const mpesaReceiptNumber = callbackMetadata.find(
			(item: { Name: string; Value: string | number }) =>
				item.Name === "MpesaReceiptNumber",
		)?.Value;

		const updatePayments = await step.run(
			"update-payment-records",
			async () => {
				return await db.transaction(async (tx) => {
					// Lock the payment record for idempotent processing
					const [payment] = await tx
						.select()
						.from(payments)
						.where(eq(payments.id, fetchedPayment.id))
						.for("update");

					if (!payment || payment.status !== "pending") {
						return {
							success: true,
							skipped: true,
							error: "Payment already processed or not found",
						};
					}

					await tx.insert(memberMemberships).values({
						id: nanoid(),
						memberId: payment.memberId,
						membershipPlanId: payment.planId as string,
						startDate: dateFormat(planDetails.startDate),
						endDate: planDetails.endDate
							? dateFormat(planDetails.endDate)
							: null,
						autoRenew: false,
						status: "active",
						paymentId: payment.id,
						previousMembershipPlanId: planDetails?.previousPlanId,
						priceCharged: payment.totalAmount,
					});

					const [{ id: journalEntryId }] = await tx
						.insert(journalEntries)
						.values({
							entryDate: payment.paymentDate,
							reference: payment.paymentNo,
							source: "plan payment",
							sourceId: payment.id,
						})
						.returning({ id: journalEntries.id });

					await tx.insert(journalLines).values({
						lineNumber: 1,
						accountId: ledgerDetails.revenueAccountId as number,
						journalEntryId,
						amount: payment.lineTotal,
						dc: "credit",
					});

					if (parseFloat(payment.taxAmount) > 0) {
						await tx.insert(journalLines).values({
							lineNumber: 2,
							accountId: ledgerDetails.vatAccountId as number,
							journalEntryId,
							amount: payment.taxAmount,
							dc: "credit",
						});
					}

					await tx.insert(journalLines).values({
						lineNumber: 3,
						accountId: ledgerDetails.bankAccountId as number,
						journalEntryId,
						amount: payment.totalAmount,
						dc: "debit",
					});

					await tx
						.update(payments)
						.set({
							status: "completed",
							reference: mpesaReceiptNumber?.toString(),
						})
						.where(eq(payments.id, payment.id));

					return { success: true, skipped: false, error: null };
				});
			},
		);

		await step.run("send-sms", async () => {
			if (!updatePayments.success || updatePayments.skipped) return;

			const member = await db.query.members.findFirst({
				columns: { firstName: true, contact: true },
				where: (members, { eq }) => eq(members.id, fetchedPayment.memberId),
			});

			if (!member) {
				return { success: false, error: "Member not found" };
			}

			const message = `Dear ${toTitleCase(member.firstName)}, your payment of ${currencyFormatter(fetchedPayment.totalAmount)} has been completed successfully. We're glad you're continuing with us`;
			await sendSms({
				to: [internationalizePhoneNumber(member.contact as string, true)],
				message,
			});
		});
	},
);
