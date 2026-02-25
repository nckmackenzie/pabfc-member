import { z } from "zod";

export const checkInsValidateSearch = z.object({
	dateRange: z
		.object({
			from: z.iso.date().optional(),
			to: z.iso.date().optional(),
		})
		.optional(),
});

export type CheckInsValidateSearch = z.infer<typeof checkInsValidateSearch>;
