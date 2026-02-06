import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { OtpVerifyForm } from "@/features/auth/components/otp-verify-form";

export const Route = createFileRoute("/(auth)/2fa")({
	component: TwoFactor,
	head: () => ({ meta: [{ title: "2FA / PABFC" }] }),
});

function TwoFactor() {
	const { safeRedirectTo } = Route.useRouteContext();
	return (
		<div className="min-h-full flex items-center justify-center">
			<div className="max-w-md w-full">
				<Card>
					<CardHeader>
						<CardTitle>Verify via Authenticator App</CardTitle>
						<CardDescription>
							Enter the code from your authenticator app.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<OtpVerifyForm redirectTo={safeRedirectTo} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
