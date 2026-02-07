import { getRouteApi, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { ToastContent } from "@/components/ui/toast-content";
import { useFilters } from "@/hooks/use-filters";
import { authClient } from "@/lib/auth-client";
import { useAppForm } from "@/lib/form";

const optVerifySchema = z.object({
	code: z.string().length(6, "Code must be 6 characters long"),
	trustDevice: z.boolean(),
});

export function OtpVerifyForm({ redirectTo }: { redirectTo?: string }) {
	const navigate = useNavigate({ from: "/2fa" });
	const { setFilters } = useFilters(getRouteApi("/(auth)/2fa").id);
	const form = useAppForm({
		defaultValues: {
			code: "",
			trustDevice: false,
		},
		validators: {
			onSubmit: optVerifySchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.twoFactor.verifyTotp({
				code: value.code,
				trustDevice: value.trustDevice,
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
				<form.AppField name="trustDevice">
					{(field) => <field.Switch label="Trust this device" />}
				</form.AppField>
			</FieldGroup>
			<form.AppForm>
				<form.SubscribeButton label="Verify & Continue" className="w-full" />
			</form.AppForm>
			<Button
				variant="link"
				className="w-full"
				onClick={() => setFilters({ verifyMethod: "backup-code" })}
			>
				Don&apos;t have a 2FA device? Use Backup Codes Instead?
			</Button>
		</form>
	);
}

const backupCodeVerifySchema = z.object({
	code: z.string().min(1, "Code is required"),
	trustDevice: z.boolean(),
});

export function BackupCodeVerifyForm({ redirectTo }: { redirectTo?: string }) {
	const navigate = useNavigate({ from: "/2fa" });
	const { setFilters } = useFilters(getRouteApi("/(auth)/2fa").id);
	const form = useAppForm({
		defaultValues: {
			code: "",
			trustDevice: false,
		},
		validators: {
			onSubmit: backupCodeVerifySchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.twoFactor.verifyBackupCode({
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
					{(field) => (
						<field.Input label="Backup Code" placeholder="Backup Code" />
					)}
				</form.AppField>
				<form.AppField name="trustDevice">
					{(field) => <field.Switch label="Trust this device" />}
				</form.AppField>
			</FieldGroup>
			<form.AppForm>
				<form.SubscribeButton label="Verify & Continue" className="w-full" />
			</form.AppForm>
			<Button
				variant="link"
				type="button"
				className="w-full"
				onClick={() => setFilters({ verifyMethod: "totp" })}
			>
				Use Authenticator App Instead?
			</Button>
		</form>
	);
}
