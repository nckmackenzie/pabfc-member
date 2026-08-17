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
import { db } from "@/db";
import {
	members,
	membershipPlans,
	mpesaStkRequests,
	payments,
} from "@/drizzle/schema";
import {
	billingSettingsSchema,
	paymentsValidateSearch,
} from "@/features/payments/services/schema";
import {
	dateFormat,
	generateFullPaymentInvoiceNo,
	normalizeDateRange,
} from "@/lib/helpers";
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
	.validator(paymentsValidateSearch)
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

		const billing = billingSettingsSchema.parse(settings?.billing ?? {});

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
						billing.invoicePrefix,
						billing.invoiceNumberPadding,
					),
				})),
			);
	});

export const getPaymentStatusFn = createServerFn()
	.middleware([authMiddleware])
	.validator((checkoutRequestId: string) => checkoutRequestId)
	.handler(async ({ data: checkoutRequestId, context: { memberId } }) => {
		const payment = await db.query.mpesaStkRequests.findFirst({
			where: and(
				eq(mpesaStkRequests.checkoutRequestId, checkoutRequestId),
				eq(mpesaStkRequests.memberId, memberId),
			),
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
