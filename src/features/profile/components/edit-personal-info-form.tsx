import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { ToastContent } from "@/components/ui/toast-content";
import { AvatarUpload } from "@/features/profile/components/avatar";
import { useAvatarUpload } from "@/features/profile/hooks/use-image-upload";
import {
	type EditPersonalInfoSchema,
	editPersonalInfoSchema,
} from "@/features/profile/services/schema";
import { authClient } from "@/lib/auth-client";
import { useAppForm } from "@/lib/form";
import { toTitleCase } from "@/lib/utils";

export const EditPersonalInfoForm = () => {
	const router = useRouter();
	const { userInfo } = getRouteApi("/(protected)/profile/").useLoaderData();
	const avatarUploadMutation = useAvatarUpload();

	const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
	const [pendingAvatarPreview, setPendingAvatarPreview] = useState<
		string | null
	>(null);
	const hasAvatarChanges = !!pendingAvatarFile;

	const updateProfileMutation = useMutation({
		mutationFn: async (
			values: EditPersonalInfoSchema & { avatarFile?: File | null },
		) => {
			const updates: {
				avatarUrl?: string;
				name?: string;
				contact?: string;
				email?: string;
			} = {};

			if (values.avatarFile) {
				updates.avatarUrl = await avatarUploadMutation.mutateAsync(
					values.avatarFile,
				);
			}

			const promises = [
				authClient.updateUser({
					name: values.name,
					contact: values.contact,
					image: hasAvatarChanges ? updates.avatarUrl : (values.image ?? null),
				}),
			];

			if (values.email !== userInfo.email && values.email) {
				promises.push(
					authClient.changeEmail({
						newEmail: values.email,
						callbackURL: "/profile",
					}),
				);
				updates.email = values.email;
			}

			const res = await Promise.all(promises);
			const updateUserRes = res[0];
			const changeEmailRes = res[1] ?? { error: false };

			if (updateUserRes.error) {
				throw new Error(updateUserRes.error.message);
			}

			if (changeEmailRes.error) {
				throw new Error(changeEmailRes.error.message);
			}

			return updates;
		},
		onSuccess: async () => {
			setPendingAvatarFile(null);
			setPendingAvatarPreview(null);
			toast.success((t) => (
				<ToastContent
					t={t}
					title="Success"
					message="Profile updated successfully"
				/>
			));
			form.reset();
			await router.invalidate({ sync: true });
		},
		onError: (error) => {
			toast.error((t) => (
				<ToastContent t={t} title="Error" message={error.message} />
			));
		},
	});

	const form = useAppForm({
		defaultValues: {
			name: toTitleCase(userInfo.name),
			contact: userInfo.contact,
			email: userInfo.email,
			image: userInfo.image,
		} as EditPersonalInfoSchema,
		validators: {
			onSubmit: editPersonalInfoSchema,
		},
		onSubmit: async ({ value }) => {
			await updateProfileMutation.mutateAsync({
				...value,
				avatarFile: pendingAvatarFile,
			});
		},
	});

	const handleImageSelect = (file: File | null) => {
		setPendingAvatarFile(file);
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPendingAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setPendingAvatarPreview(null);
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<div>
				<div>
					<FieldLabel className="block text-sm font-medium mb-2">
						Profile Picture
					</FieldLabel>
					<AvatarUpload
						currentAvatar={userInfo.image}
						onImageSelect={handleImageSelect}
						pendingImage={pendingAvatarPreview}
						disabled={updateProfileMutation.isPending}
					/>
				</div>
			</div>
			<FieldGroup className="grid md:grid-cols-2 gap-4">
				<form.AppField name="name">
					{(field) => <field.Input label="Name" />}
				</form.AppField>
				<form.AppField name="contact">
					{(field) => <field.Input label="Contact" />}
				</form.AppField>
			</FieldGroup>
			<form.AppField name="email">
				{(field) => <field.Input label="Email" />}
			</form.AppField>
			<form.AppForm>
				<form.SubscribeButton
					label="Save Changes"
					className="w-full lg:w-fit"
				/>
			</form.AppForm>
		</form>
	);
};
