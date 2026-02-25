// src/hooks/usePaymentStatus.ts
import { useQuery } from "@tanstack/react-query";
import { getPaymentStatusFn } from "@/features/payments/services/payments.api";

export function usePaymentStatus(checkoutRequestId: string | null) {
	return useQuery({
		queryKey: ["mpesa", "status", checkoutRequestId],
		queryFn: () => getPaymentStatusFn({ data: checkoutRequestId as string }),
		enabled: !!checkoutRequestId,
		refetchInterval: (query) => {
			const status = query.state.data?.status;
			if (status === "success" || status === "failed") return false;
			return 3000;
		},
	});
}
