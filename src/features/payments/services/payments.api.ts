import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
	and,
	asc,
	desc,
	eq,
	gte,
	ilike,
	isNull,
	lte,
	or,
	type SQL,
	sql,
} from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/db";
import {
	members,
	membershipPlans,
	mpesaStkRequests,
	payments,
} from "@/drizzle/schema";
import {
	paymentFormSchema,
	paymentsValidateSearch,
} from "@/features/payments/services/schema";
import { NotFoundError } from "@/lib/error-handling/app-error";
import {
	dateFormat,
	generateFullPaymentInvoiceNo,
	normalizeDateRange,
	taxCalculator,
} from "@/lib/helpers";
import { initiateMpesaStkPush } from "@/lib/mpesa";
import { authMiddleware } from "@/middlewares/auth-middleware";

export const getPlansAndPhoneNumber = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context: { memberId } }) => {
		const plans = await db.query.membershipPlans.findMany({
			columns: { id: true, name: true, price: true },
			where: and(
				eq(membershipPlans.active, true),
				or(
					gte(membershipPlans.validTo, dateFormat(new Date())),
					isNull(membershipPlans.validTo),
				),
			),
			orderBy: asc(sql`lower(${membershipPlans.name})`),
		});

		const member = await db.query.members.findFirst({
			columns: { contact: true },
			where: eq(members.id, memberId),
		});

		if (!member?.contact) {
			throw notFound();
		}

		return { plans, contact: member.contact };
	});

export const getPayments = createServerFn()
	.middleware([authMiddleware])
	.inputValidator(paymentsValidateSearch)
	.handler(async ({ data, context: { memberId } }) => {
		const filters: Array<SQL> = [];

		if (data.search) {
			const searchFilters = or(
				ilike(payments.reference, `%${data.search}%`),
				ilike(membershipPlans.name, `%${data.search}%`),
				ilike(sql`CAST(${payments.totalAmount} AS TEXT)`, `%${data.search}%`),
			);

			if (searchFilters) filters.push(searchFilters);
		}

		if (data.dateRange?.from && data.dateRange?.to) {
			const { from, to } = normalizeDateRange(
				data.dateRange.from,
				data.dateRange.to,
			);
			filters.push(gte(payments.paymentDate, from));
			filters.push(lte(payments.paymentDate, to));
		}

		const settings = await db.query.settings.findFirst({
			columns: {
				createdAt: false,
				updatedAt: false,
				createdBy: false,
				updatedBy: false,
			},
		});

		return db
			.select({
				id: payments.id,
				reference: payments.reference,
				paymentDate: payments.paymentDate,
				totalAmount: payments.totalAmount,
				method: payments.method,
				paymentNo: payments.paymentNo,
				plan: membershipPlans.name,
			})
			.from(payments)
			.innerJoin(membershipPlans, eq(payments.planId, membershipPlans.id))
			.where(
				and(
					eq(payments.memberId, memberId),
					eq(payments.status, "completed"),
					...filters,
				),
			)
			.orderBy(desc(payments.paymentDate))
			.then((d) =>
				d.map((d) => ({
					...d,
					paymentNo: generateFullPaymentInvoiceNo(
						+d.paymentNo,
						// @ts-expect-error
						settings?.billing?.invoicePrefix ?? "REC",
						// @ts-expect-error
						settings?.billing?.invoiceNumberPadding ?? 6,
					),
				})),
			);
	});

export const getPaymentStatusFn = createServerFn()
	.middleware([authMiddleware])
	.inputValidator((checkoutRequestId: string) => checkoutRequestId)
	.handler(async ({ data: checkoutRequestId }) => {
		const payment = await db.query.mpesaStkRequests.findFirst({
			where: eq(mpesaStkRequests.checkoutRequestId, checkoutRequestId),
		});

		if (!payment) {
			return { exists: false } as const;
		}

		return {
			exists: true,
			status: payment.status,
			amount: payment.amount,
			phoneNumber: payment.phoneNumber,
		} as const;
	});

export const getPaymentNo = createServerFn()
	.middleware([authMiddleware])
	.handler(async () => {
		const { rows } = await db.execute<{ maxno: number }>(
			sql`SELECT coalesce(MAX(CAST(payment_no AS integer)), 0) as maxno FROM payments`,
		);
		return +rows[0].maxno + 1;
	});

export const initiateStkPushFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(paymentFormSchema)
	.handler(
		async ({
			data,
			context: {
				user: { id: userId },
				memberId,
			},
		}) => {
			const { contact, planId } = data;
			const paymentNo = await getPaymentNo();
			const settings = await db.query.settings.findFirst({
				columns: { billing: true },
			});

			const plan = await db.query.membershipPlans.findFirst({
				where: eq(membershipPlans.id, planId),
			});

			if (!plan) {
				throw new NotFoundError("Plan");
			}

			const amount = plan.price;

			const accountReference = generateFullPaymentInvoiceNo(
				paymentNo,
				// @ts-expect-error
				settings?.billing?.invoicePrefix ?? "REC",
				// @ts-expect-error
				settings?.billing?.invoiceNumberPadding ?? 6,
			);

			const mpesaRes = await initiateMpesaStkPush({
				amount,
				phoneNumber: contact,
				accountReference,
				transactionDesc: "Membership Plan Payment",
			});

			const checkoutRequestId = mpesaRes.CheckoutRequestID;
			const merchantRequestId = mpesaRes.MerchantRequestID;

			// @ts-expect-error
			const taxType = settings?.billing?.applyTaxToMembership
				? // @ts-expect-error
					(settings.billing?.vatType ?? "inclusive")
				: "none";
			const { amountExlusiveTax, taxAmount, totalInclusiveTax } = taxCalculator(
				amount,
				taxType,
			);

			const paymentId = await db.transaction(async (tx) => {
				await tx.insert(mpesaStkRequests).values({
					status: "pending",
					amount: amount.toString(),
					initiatedChannel: "portal",
					memberId,
					phoneNumber: contact,
					checkoutRequestId,
					merchantRequestId,
				});

				const [{ id }] = await tx
					.insert(payments)
					.values({
						id: nanoid(),
						amount: amount.toString(),
						channel: "portal",
						memberId,
						lineTotal: amountExlusiveTax.toString(),
						method: "mpesa_stk",
						paymentNo: paymentNo.toString(),
						totalAmount: totalInclusiveTax.toString(),
						planId: plan.id,
						externalReference: checkoutRequestId,
						createdByUserId: userId,
						vatType: taxType as "inclusive" | "exclusive" | "none",
						taxAmount: taxAmount.toString(),
					})
					.returning({ id: payments.id });

				return id;
			});

			return {
				checkoutRequestId,
				merchantRequestId,
				customerMessage: mpesaRes.CustomerMessage,
				responseDescription: mpesaRes.ResponseDescription,
				paymentId,
			};
		},
	);
