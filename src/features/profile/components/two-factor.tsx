import { getRouteApi, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { ToastContent } from "@/components/ui/toast-content";
import { authClient } from "@/lib/auth-client";
import { useAppForm } from "@/lib/form";

type TwoFactorData = {
	totpURI: string;
	backupCodes: string[];
};

const twoFactorSchema = z.object({
	password: z.string().min(1, "Password is required"),
});
type TwoFactorSchema = z.infer<typeof twoFactorSchema>;

export function TwoFactor() {
	const router = useRouter();
	const [twoFactorData, setTwoFactorData] = useState<TwoFactorData | null>(
		null,
	);
	const {
		userInfo: { twoFactorEnabled },
	} = getRouteApi("/(protected)/profile/").useLoaderData();

	const form = useAppForm({
		defaultValues: {
			password: "",
		},
		validators: {
			onSubmit: twoFactorSchema,
		},
		onSubmit: async ({ value }) => {
			if (twoFactorEnabled) {
				await disable2FA(value);
			} else {
				await enable2FA(value);
			}
		},
	});

	async function enable2FA(value: TwoFactorSchema) {
		const { data, error } = await authClient.twoFactor.enable({
			password: value.password,
		});
		if (error) {
			toast.error((t) => (
				<ToastContent
					t={t}
					title="Error"
					message={error.message ?? "Failed to enable 2FA"}
				/>
			));
			return;
		}
		setTwoFactorData(data);
		form.reset();
	}

	async function disable2FA(data: TwoFactorSchema) {
		await authClient.twoFactor.disable({
			password: data.password,
			fetchOptions: {
				onSuccess: async () => {
					toast.success((t) => (
						<ToastContent
							t={t}
							title="Success"
							message="Two Factor Authentication Disabled"
						/>
					));
					await router.invalidate({ sync: true });
					form.reset();
				},
				onError: (error) => {
					toast.error((t) => (
						<ToastContent
							t={t}
							title="Error"
							message={error.error.message ?? "Failed to disable 2FA"}
						/>
					));
				},
			},
		});
	}

	if (twoFactorData !== null) {
		return (
			<QRCodeForm
				data={twoFactorData}
				onCompletion={() => setTwoFactorData(null)}
			/>
		);
	}

	return (
		<Card>
			<CardHeader className="flex items-center justify-between gap-2">
				<CardTitle>Two Factor Authentication</CardTitle>
				<Badge variant={twoFactorEnabled ? "default" : "outline"}>
					{twoFactorEnabled ? "Enabled" : "Disabled"}
				</Badge>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<FieldGroup>
						<form.AppField name="password">
							{(field) => <field.PasswordInput label="Password" />}
						</form.AppField>
					</FieldGroup>
					<form.AppForm>
						<form.SubscribeButton
							variant={twoFactorEnabled ? "destructive" : "default"}
							label={twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
							className="w-full lg:w-fit"
						/>
					</form.AppForm>
				</form>
			</CardContent>
		</Card>
	);
}

const qrFormSchema = z.object({
	code: z
		.string()
		.min(6, "Code must be at least 6 characters long")
		.max(6, "Code must be at most 6 characters long"),
});

function QRCodeForm({
	data,
	onCompletion,
}: {
	data: TwoFactorData;
	onCompletion: () => void;
}) {
	const [enabled, setEnabled] = useState(false);
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			code: "",
		},
		validators: {
			onSubmit: qrFormSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.twoFactor.verifyTotp({
				code: value.code,
				fetchOptions: {
					onSuccess: async () => {
						setEnabled(true);
						await router.invalidate({ sync: true });
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

	if (enabled) {
		return <BackupCodes data={data.backupCodes} onDone={onCompletion} />;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Scan the QR code with your authenticator app</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-4"
				>
					<form.AppField name="code">
						{(field) => <field.InputOtp />}
					</form.AppField>
					<form.AppForm>
						<form.SubscribeButton label="Complete" />
					</form.AppForm>
				</form>
				<div className="p-4 border bg-white rounded-lg w-fit mx-auto">
					<QRCode size={256} value={data.totpURI} />
				</div>
			</CardContent>
		</Card>
	);
}

function BackupCodes({ data, onDone }: { data: string[]; onDone: () => void }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Backup Codes</CardTitle>
				<CardDescription>
					These codes can be used to log in if you lose access to your
					authenticator app. Store them in a secure place.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4">
					{data.map((code) => (
						<div key={code} className="flex items-center justify-between">
							<span>{code}</span>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline" onClick={onDone}>
					Done
				</Button>
			</CardFooter>
		</Card>
	);
}
