import { z } from "zod";

export const editPersonalInfoSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters long"),
	contact: z
		.string()
		.min(10, "Phone number must be at least 10 characters long"),
	email: z.email().nullish(),
	image: z.string().nullish(),
});

export const profileSearchValidate = z.object({
	tab: z.enum(["personal", "security", "account"]).default("personal"),
})

export const changePasswordSchema = z.object({
	currentPassword: z.string().min(1, "Current password is required").refine((value) => value.length >= 6, "Current password must be at least 6 characters long"),
	newPassword: z.string().min(1, "New password is required").refine((value) => value.length >= 6, "New password must be at least 6 characters long"),
	confirmPassword: z.string().min(1, "Confirm password is required").refine((value) => value.length >= 6, "Confirm password must be at least 6 characters long"),
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
})

export type EditPersonalInfoSchema = z.infer<typeof editPersonalInfoSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
