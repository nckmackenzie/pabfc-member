import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { z } from "zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BackupCodeVerifyForm,
	OtpVerifyForm,
} from "@/features/auth/components/otp-verify-form";
import { useFilters } from "@/hooks/use-filters";

const defaultValues = {
	verifyMethod: "totp" as "totp" | "backup-code",
};

export const Route = createFileRoute("/(auth)/2fa")({
	component: TwoFactor,
	head: () => ({ meta: [{ title: "2FA / PABFC" }] }),
	validateSearch: z.object({
		verifyMethod: z.enum(["totp", "backup-code"]).optional().catch("totp"),
	}),
	search: {
		middlewares: [stripSearchParams(defaultValues)],
	},
});

function TwoFactor() {
	const { safeRedirectTo } = Route.useRouteContext();
	const {
		filters: { verifyMethod },
	} = useFilters(Route.id);

	return (
		<div className="min-h-full flex items-center justify-center">
			<div className="max-w-md w-full">
				<Card>
					<CardHeader>
						<CardTitle>
							{verifyMethod === "totp"
								? "Verify via Authenticator App"
								: "Verify via Backup Code"}
						</CardTitle>
						<CardDescription>
							{verifyMethod === "totp"
								? "Enter the code from your authenticator app."
								: "Enter your backup code."}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{!verifyMethod || verifyMethod === "totp" ? (
							<OtpVerifyForm redirectTo={safeRedirectTo} />
						) : (
							<BackupCodeVerifyForm redirectTo={safeRedirectTo} />
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
