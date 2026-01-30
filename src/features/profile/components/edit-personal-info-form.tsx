import { getRouteApi } from "@tanstack/react-router";
import { FieldGroup } from "@/components/ui/field";
import {
	type EditPersonalInfoSchema,
	editPersonalInfoSchema,
} from "@/features/profile/services/schema";
import { useAppForm } from "@/lib/form";
import { toTitleCase } from "@/lib/utils";

export const EditPersonalInfoForm = () => {
	const { memberInfo } = getRouteApi("/(protected)/profile/").useLoaderData();

	const form = useAppForm({
		defaultValues: {
			firstName: toTitleCase(memberInfo.firstName.toLowerCase()),
			lastName: toTitleCase(memberInfo.lastName.toLowerCase()),
			contact: memberInfo.contact,
			email: memberInfo.email,
			image: memberInfo.image,
		} as EditPersonalInfoSchema,
		validators: {
			onSubmit: editPersonalInfoSchema,
		},
	});
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<FieldGroup className="grid md:grid-cols-2 gap-4">
				<form.AppField name="firstName">
					{(field) => <field.Input label="First Name" />}
				</form.AppField>
				<form.AppField name="lastName">
					{(field) => <field.Input label="Last Name" />}
				</form.AppField>
				<form.AppField name="contact">
					{(field) => <field.Input label="Contact" />}
				</form.AppField>
				<form.AppField name="email">
					{(field) => <field.Input label="Email" />}
				</form.AppField>
			</FieldGroup>
			<form.AppForm>
				<form.SubscribeButton
					label="Save Changes"
					className="w-full lg:w-fit"
				/>
			</form.AppForm>
		</form>
	);
};
