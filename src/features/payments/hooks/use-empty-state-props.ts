import { useMemo } from "react";

export function usePaymentsEmptyState(
	hasFilters: boolean,
	reset: () => void,
	add: () => void,
) {
	return useMemo(
		() =>
			!hasFilters
				? {
						title: "No payments yet",
						description: "Once you make a payment, it will appear here",
						buttonText: "Make a Payment",
						buttonAction: () => add(),
					}
				: {
						title: "No payments found",
						description: "No payments found matching your search",
						buttonText: "Clear filters",
						buttonAction: () => reset(),
					},
		[hasFilters, reset, add],
	);
}
