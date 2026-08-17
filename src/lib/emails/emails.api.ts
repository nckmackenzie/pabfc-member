import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";
import { EmailVerification } from "@/lib/emails/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmailVerificationEmail = createServerFn({
	method: "POST",
})
	.validator(
		z.object({
			url: z.string(),
			name: z.string(),
			email: z.string(),
		}),
	)
	.handler(async ({ data }) => {
		try {
			const { error } = await resend.emails.send({
				from:
					process.env.NODE_ENV === "development"
						? "Prime Age Beauty & Fitness Center <onboarding@resend.dev>"
						: "Prime Age Beauty & Fitness Center <info@primeagebeauty.com>",
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
