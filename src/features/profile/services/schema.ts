import { z } from "zod";

export const editPersonalInfoSchema = z.object({
	firstName: z.string().min(2, "First name must be at least 2 characters long"),
	lastName: z.string().min(2, "Last name must be at least 2 characters long"),
	contact: z
		.string()
		.min(10, "Phone number must be at least 10 characters long"),
	email: z.email().nullish(),
	image: z.string().optional(),
});

export type EditPersonalInfoSchema = z.infer<typeof editPersonalInfoSchema>;
