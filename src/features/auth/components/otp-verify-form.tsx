import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { z } from "zod";
import { FieldGroup } from "@/components/ui/field";
import { ToastContent } from "@/components/ui/toast-content";
import { authClient } from "@/lib/auth-client";
import { useAppForm } from "@/lib/form";

const optVerifySchema = z.object({
	code: z.string().length(6, "Code must be 6 characters long"),
});

export function OtpVerifyForm({ redirectTo }: { redirectTo?: string }) {
	const navigate = useNavigate({ from: "/2fa" });
	const form = useAppForm({
		defaultValues: {
			code: "",
		},
		validators: {
			onSubmit: optVerifySchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.twoFactor.verifyTotp({
				code: value.code,
				fetchOptions: {
					onSuccess: async () => {
						form.reset();
						navigate({ to: redirectTo ?? "/dashboard", replace: true });
					},
					onError: (error) => {
						toast.error((t) => (
							<ToastContent
								t={t}
								title="Error"
								message={error.error.message ?? "Failed to verify 2FA"}
							/>
						));
					},
				},
			});
		},
	});
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<FieldGroup className="flex justify-center">
				<form.AppField name="code">
					{(field) => <field.InputOtp />}
				</form.AppField>
			</FieldGroup>
			<form.AppForm>
				<form.SubscribeButton label="Verify & Continue" className="w-full" />
			</form.AppForm>
		</form>
	);
}
