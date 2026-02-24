import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { ToastContent } from "@/components/ui/toast-content";
import {
	type SelfRegistrationFormSchema,
	selfRegistrationFormSchema,
} from "@/features/profile/services/schema";
import { parseErrorMessage } from "@/lib/error-handling/error-handling";
import { useAppForm } from "@/lib/form";
import { toTitleCase } from "@/lib/utils";
import { useAvatarUpload } from "../hooks/use-image-upload";
import { completeRegistration } from "../services/member.api";
import { AvatarUpload } from "./avatar";

export function SelfRegistrationForm() {
	const route = getRouteApi("/register/$shortcode/");
	const { fullName, memberId } = route.useLoaderData();
	const { shortcode } = route.useParams();
	const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
	const [pendingAvatarPreview, setPendingAvatarPreview] = useState<
		string | null
	>(null);
	const avatarUploadMutation = useAvatarUpload(memberId);
	const navigate = useNavigate({ from: "/register/$shortcode/" });

	const updateMemberDetails = useMutation({
		mutationFn: async (
			values: SelfRegistrationFormSchema & { avatarFile?: File | null },
		) => {
			let avartarUrl: string | undefined;

			if (values.avatarFile) {
				avartarUrl = await avatarUploadMutation.mutateAsync(values.avatarFile);
			}

			if (!avartarUrl) {
				throw new Error("Failed to upload your photo. Please try again.");
			}

			return await completeRegistration({
				data: {
					email: values.email,
					idNumber: values.idNumber,
					idType: values.idType,
					image: avartarUrl,
					memberId: values.memberId,
					name: values.name,
					shortCode: values.shortCode,
				},
			});
		},

		onSuccess: async () => {
			setPendingAvatarFile(null);
			setPendingAvatarPreview(null);
			toast.success((t) => (
				<ToastContent
					t={t}
					title="Success"
					message="Registration completed successfully"
				/>
			));
			form.reset();
			navigate({ to: "/sign-in" });
		},
		onError: (error) => {
			const passedErrorMessage = parseErrorMessage(error);
			toast.error((t) => (
				<ToastContent
					t={t}
					title={passedErrorMessage.title}
					message={passedErrorMessage.message}
				/>
			));
		},
	});

	const form = useAppForm({
		defaultValues: {
			name: toTitleCase(fullName),
			idType: "nationalId",
			idNumber: "",
			email: "",
			image: null,
			memberId,
			shortCode: shortcode,
		} as SelfRegistrationFormSchema,
		validators: {
			onSubmit: selfRegistrationFormSchema,
		},
		onSubmit: async ({ value }) => {
			await updateMemberDetails.mutateAsync({
				...value,
				idType: value.idType as SelfRegistrationFormSchema["idType"],
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
				form.handleSubmit();
			}}
			className="space-y-4"
		>
			<div>
				<FieldLabel className="block text-sm font-medium mb-2">
					Profile Picture
				</FieldLabel>
				<AvatarUpload
					currentAvatar={null}
					onImageSelect={handleImageSelect}
					pendingImage={pendingAvatarPreview}
					buttonLabel="Upload Photo"
					disabled={updateMemberDetails.isPending}
				/>
			</div>
			<FieldGroup className="grid md:grid-cols-2 gap-4">
				<form.AppField name="name">
					{(field) => <field.Input label="Full Name" disabled />}
				</form.AppField>
				<form.AppField name="email">
					{(field) => <field.Input label="Email" />}
				</form.AppField>
				<form.AppField name="idType">
					{(field) => (
						<field.Select
							label="Identification Type"
							values={[
								{ label: "National ID", value: "nationalId" },
								{ label: "Passport", value: "passport" },
								{ label: "Driver's License", value: "driversLicense" },
							]}
						/>
					)}
				</form.AppField>
				<form.AppField name="idNumber">
					{(field) => <field.Input label="ID Number" />}
				</form.AppField>
			</FieldGroup>
			<form.AppForm>
				<form.SubscribeButton
					label="Complete Registration"
					className="w-full"
					isPending={updateMemberDetails.isPending}
				/>
			</form.AppForm>
		</form>
	);
}
