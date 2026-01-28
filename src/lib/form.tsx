import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import {
	PasswordTextField,
	Select,
	SubscribeButton,
	Switch,
	TextArea,
	TextField,
} from "@/components/form-components";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		Input: TextField,
		Textarea: TextArea,
		PasswordInput: PasswordTextField,
		Select,
		TextArea,
		Switch,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
