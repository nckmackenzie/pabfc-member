// src/hooks/useStkPush.ts
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { initiateStkPushFn } from "@/features/payments/services/payments.api";
import type { paymentFormSchema } from "@/features/payments/services/schema";

export function useStkPush() {
	return useMutation({
		mutationKey: ["mpesa", "stkPush"],
		mutationFn: async (input: z.infer<typeof paymentFormSchema>) => {
			return await initiateStkPushFn({ data: input });
		},
	});
}
