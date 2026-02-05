import toast from "react-hot-toast";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { ToastContent } from "@/components/ui/toast-content";
import { changePasswordSchema } from "@/features/profile/services/schema";
import { authClient } from "@/lib/auth-client";
import { useAppForm } from "@/lib/form";

export function SecurityForm() {
	const form = useAppForm({
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: changePasswordSchema,
		},
		onSubmit: async ({ value: { currentPassword, newPassword } }) => {
			await authClient.changePassword(
				{
					newPassword,
					currentPassword,
					revokeOtherSessions: true,
				},
				{
					onError: (error) => {
						toast.error((t) => (
							<ToastContent t={t} title="Error" message={error.error.message} />
						));
					},
					onSuccess: () => {
						toast.success((t) => (
							<ToastContent
								t={t}
								title="Password Changed"
								message="Your password has been changed successfully"
							/>
						));
						form.reset();
					},
				},
			);
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Security</CardTitle>
				<CardDescription>Update your security information</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.AppField name="currentPassword">
							{(field) => <field.PasswordInput label="Current Password" />}
						</form.AppField>
						<form.AppField name="newPassword">
							{(field) => <field.PasswordInput label="New Password" />}
						</form.AppField>
						<form.AppField name="confirmPassword">
							{(field) => <field.PasswordInput label="Confirm Password" />}
						</form.AppField>
						<form.AppForm>
							<form.SubscribeButton label="Change Password" />
						</form.AppForm>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
