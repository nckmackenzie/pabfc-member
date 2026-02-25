import { z } from "zod";

export const paymentsValidateSearch = z.object({
	search: z.string().optional(),
	dateRange: z
		.object({
			from: z.iso.date().optional(),
			to: z.iso.date().optional(),
		})
		.optional(),
});

export const paymentFormSchema = z.object({
	contact: z
		.string()
		.min(1, { error: "Phone number is required" })
		.regex(/254\d{9}/, {
			error: "Invalid phone number (eg 254722000000)",
		}),
	planId: z.string().min(1, { error: "Select your preferred plan" }),
	amount: z.number().min(1, { error: "Amount is required" }),
});

export type PaymentsValidateSearch = z.infer<typeof paymentsValidateSearch>;
