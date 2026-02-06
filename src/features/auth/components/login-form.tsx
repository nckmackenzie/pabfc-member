import { Link, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { ToastContent } from "@/components/ui/toast-content";
import { loginSchema } from "@/features/auth/services/schemas";
import {
	sanitizeRedirect,
	usePreviousLocation,
} from "@/hooks/use-previous-location";
import { authClient } from "@/lib/auth-client";
import { useAppForm } from "@/lib/form";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
	const previousLocation = usePreviousLocation();
	const navigate = useNavigate({ from: "/sign-in" });
	const form = useAppForm({
		defaultValues: { username: "", password: "" },
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.username({
				username: value.username,
				password: value.password,
				fetchOptions: {
					onError: (error) => {
						toast.error((t) => (
							<ToastContent
								message={error.error.message ?? "An unknown error occurred"}
								title="Login Error"
								t={t}
							/>
						));
					},
					onSuccess: async () => {
						const target = sanitizeRedirect(redirectTo ?? previousLocation);
						form.reset();
						navigate({ to: target, replace: true });
					},
				},
			});
		},
	});

	async function handleGoogleLogin() {
		await authClient.signIn.social({
			provider: "google",
			fetchOptions: {
				onError: (error) => {
					console.error(error);
					toast.error((t) => (
						<ToastContent
							message={error.error.message ?? "An unknown error occurred"}
							title="Login Error"
							t={t}
						/>
					));
				},
				onSuccess: async () => {
					const target = sanitizeRedirect(redirectTo ?? previousLocation);
					form.reset();
					navigate({ to: target, replace: true });
				},
			},
		});
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="self-stretch space-y-4"
		>
			<FieldGroup>
				<form.AppField name="username">
					{(field) => {
						return (
							<field.Input
								label="Phone No"
								placeholder="Enter your phone number"
							/>
						);
					}}
				</form.AppField>
				<form.AppField name="password">
					{(field) => {
						return (
							<field.PasswordInput
								label="Password"
								placeholder="Enter your password"
							/>
						);
					}}
				</form.AppField>
			</FieldGroup>
			<Link
				className="text-sm block text-right text-blue-800 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
				to="/forgot-password"
			>
				Forgot password?
			</Link>
			<FieldGroup>
				<form.AppForm>
					<form.SubscribeButton label="Login" className="w-full" />
				</form.AppForm>
			</FieldGroup>
			<FieldGroup>
				<div className="relative flex items-center py-5">
					<div className="grow border-t border-gray-300"></div>
					<span className="shrink mx-4 text-gray-600 text-sm">
						Or continue with
					</span>
					<div className="grow border-t border-gray-300"></div>
				</div>
				<Button
					type="button"
					variant="outline"
					size="lg"
					onClick={handleGoogleLogin}
				>
					<GoogleIcon />
					Sign in with Google
				</Button>
			</FieldGroup>
		</form>
	);
}

export function GoogleIcon({ ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			viewBox="-3 0 262 262"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid"
		>
			<title>Google Icon</title>
			<path
				d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
				fill="#4285F4"
			/>
			<path
				d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
				fill="#34A853"
			/>
			<path
				d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
				fill="#FBBC05"
			/>
			<path
				d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
				fill="#EB4335"
			/>
		</svg>
	);
}
