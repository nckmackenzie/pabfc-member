import { useStore } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import * as ShadcnSelect from "@/components/ui/select";
import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { useFieldContext, useFormContext } from "@/lib/form";
import { cn } from "@/lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

export function SubscribeButton({
	label,
	className,
	variant,
}: {
	label: string;
	className?: string;
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}) {
	const form = useFormContext();
	return (
		<FieldGroup className="items-start">
			<form.Subscribe selector={(state) => state.isSubmitting}>
				{(isSubmitting) => (
					<Button
						type="submit"
						disabled={isSubmitting}
						size="lg"
						className={cn("", className)}
						variant={variant || "default"}
					>
						{label}
					</Button>
				)}
			</form.Subscribe>
		</FieldGroup>
	);
}

export function TextField({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={label}>{label}</FieldLabel>

			<Input
				value={field.state.value}
				placeholder={placeholder}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				id={field.name}
				aria-invalid={isInvalid}
			/>

			{field.state.meta.isTouched && <FieldError errors={errors} />}
		</Field>
	);
}

export function PasswordTextField({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={label}>{label}</FieldLabel>

			<PasswordInput
				value={field.state.value}
				placeholder={placeholder}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				id={field.name}
				aria-invalid={isInvalid}
			/>

			{field.state.meta.isTouched && <FieldError errors={errors} />}
		</Field>
	);
}

export function InputOtp() {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<InputOTP
			maxLength={6}
			value={field.state.value}
			onChange={field.handleChange}
		>
			<InputOTPGroup>
				<InputOTPSlot index={0} aria-invalid={isInvalid} />
				<InputOTPSlot index={1} aria-invalid={isInvalid} />
			</InputOTPGroup>
			<InputOTPGroup>
				<InputOTPSlot index={2} aria-invalid={isInvalid} />
				<InputOTPSlot index={3} aria-invalid={isInvalid} />
			</InputOTPGroup>
			<InputOTPGroup>
				<InputOTPSlot index={4} aria-invalid={isInvalid} />
				<InputOTPSlot index={5} aria-invalid={isInvalid} />
			</InputOTPGroup>
		</InputOTP>
	);
}

export function TextArea({
	label,
	rows = 3,
}: {
	label: string;
	rows?: number;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={label}>{label}</FieldLabel>
			<ShadcnTextarea
				id={label}
				value={field.state.value}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				rows={rows}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{field.state.meta.isTouched && <FieldError errors={errors} />}
		</Field>
	);
}

export function Select({
	label,
	values,
	placeholder,
}: {
	label: string;
	values: Array<{ label: string; value: string }>;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<ShadcnSelect.Select
				name={field.name}
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
			>
				<ShadcnSelect.SelectTrigger className="w-full">
					<ShadcnSelect.SelectValue placeholder={placeholder} />
				</ShadcnSelect.SelectTrigger>
				<ShadcnSelect.SelectContent>
					<ShadcnSelect.SelectGroup>
						<ShadcnSelect.SelectLabel>{label}</ShadcnSelect.SelectLabel>
						{values.map((value) => (
							<ShadcnSelect.SelectItem key={value.value} value={value.value}>
								{value.label}
							</ShadcnSelect.SelectItem>
						))}
					</ShadcnSelect.SelectGroup>
				</ShadcnSelect.SelectContent>
			</ShadcnSelect.Select>
			{field.state.meta.isTouched && <FieldError errors={errors} />}
		</Field>
	);
}

export function Slider({ label }: { label: string }) {
	const field = useFieldContext<number>();
	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={label}>{label}</FieldLabel>
			<ShadcnSlider
				id={label}
				onBlur={field.handleBlur}
				value={[field.state.value]}
				onValueChange={(value) => field.handleChange(value[0])}
				aria-invalid={isInvalid}
			/>
			{field.state.meta.isTouched && <FieldError errors={errors} />}
		</Field>
	);
}

export function Switch({ label }: { label: string }) {
	const field = useFieldContext<boolean>();
	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<div className="flex items-center gap-2">
				<ShadcnSwitch
					id={label}
					onBlur={field.handleBlur}
					checked={field.state.value}
					onCheckedChange={(checked) => field.handleChange(checked)}
					aria-invalid={isInvalid}
				/>
				<Label htmlFor={label}>{label}</Label>
			</div>
			{field.state.meta.isTouched && <FieldError errors={errors} />}
		</Field>
	);
}
