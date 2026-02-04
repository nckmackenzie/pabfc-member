import { z } from "zod";

export const editPersonalInfoSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters long"),
	contact: z
		.string()
		.min(10, "Phone number must be at least 10 characters long"),
	email: z.email().nullish(),
	image: z.string().nullish(),
});

export type EditPersonalInfoSchema = z.infer<typeof editPersonalInfoSchema>;
