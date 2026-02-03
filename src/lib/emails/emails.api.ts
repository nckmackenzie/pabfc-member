import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";
import { env } from "@/env/server";
import { EmailVerification } from "@/lib/emails/verification-email";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmailVerificationEmail = createServerFn({
	method: "POST",
})
	.inputValidator(
		z.object({
			url: z.string(),
			name: z.string(),
			email: z.string(),
		}),
	)
	.handler(async ({ data }) => {
		try {
			const { error } = await resend.emails.send({
				//TODO: Change this to the actual email address
				from: "Prime Age Beauty & Fitness Center <onboarding@resend.dev>",
				to: [
					process.env.NODE_ENV === "development"
						? "delivered@resend.dev"
						: data.email,
				],
				subject: "Verify your email address",
				react: EmailVerification({ url: data.url, name: data.name }),
			});

			if (error) {
				throw new Error("Unable to send verification email");
			}

			return Response.json(data);
		} catch (error) {
			console.error(error);
			throw new Error("Unable to send verification email");
		}
	});
