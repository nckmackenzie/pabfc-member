import { getRouteApi, useRouter } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarCheck2, LinkIcon, UnlinkIcon } from "lucide-react";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GoogleIcon } from "@/features/auth/components/login-form";
import { authClient } from "@/lib/auth-client";

export function AccountLinking() {
	const { userAccounts } = getRouteApi("/(protected)/profile/").useLoaderData();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const googleAccount = userAccounts.find(
		(account) => account.providerId === "google",
	);

	const isGoogleConnected = !!googleAccount;

	// const { isPending, mutate } = useMutation({
	// 	mutationFn: async () => {
	// 		if (isGoogleConnected) {
	// 			return await authClient.linkSocial({
	// 				provider: "google",
	// 				fetchOptions: {
	// 					onSuccess: async () => {
	// 						toast.success("Google account unlinked successfully");
	// 						await router.invalidate({ sync: true });
	// 					},
	// 					onError: (error) => {
	// 						throw new Error(error.error.message);
	// 					},
	// 				},
	// 			});
	// 		}
	// 	},
	// });

	const toggleGoogleAccount = async () => {
		startTransition(async () => {
			if (!isGoogleConnected) {
				await authClient.linkSocial({
					provider: "google",
					fetchOptions: {
						onSuccess: async () => {
							toast.success("Google account linked successfully");
							await router.invalidate({ sync: true });
						},
						onError: (error) => {
							toast.error(error.error.message);
						},
					},
					callbackURL: "/profile",
				});
			} else {
				if (!googleAccount) return;
				await authClient.unlinkAccount(
					{
						accountId: googleAccount.accountId,
						providerId: "google",
					},
					{
						onSuccess: async () => {
							toast.success("Google account unlinked successfully");
							await router.invalidate({ sync: true });
						},
						onError: (error) => {
							toast.error(error.error.message);
						},
					},
				);
			}
		});
		// if (!isGoogleConnected) {

		// }
	};

	return (
		<Card className="max-w-2xl">
			<CardHeader>
				<CardTitle>Connected Accounts</CardTitle>
				<CardDescription>
					Link your account with Social providers for faster sign in.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="rounded-lg border p-4 flex flex-col gap-4">
					<div className="flex flex-col md:items-center md:flex-row md:justify-between gap-4">
						<div className="flex flex-row items-center gap-4">
							<GoogleIcon className="w-6 h-6" />
							<div className="text-sm">
								<h3 className="font-medium">Google Account</h3>
								<p className="text-muted-foreground">
									Use your Google account to sign in without password.
								</p>
							</div>
						</div>
						<Badge variant={isGoogleConnected ? "default" : "outline"}>
							{isGoogleConnected ? "Connected" : "Not Connected"}
						</Badge>
					</div>
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center">
						{googleAccount && (
							<div className="flex flex-row items-center gap-2 text-muted-foreground">
								<CalendarCheck2 className="w-6 h-6 " />
								<p className="text-sm">
									Connected since{" "}
									{format(new Date(googleAccount.createdAt), "PP")}
								</p>
							</div>
						)}
						<Button
							variant={isGoogleConnected ? "destructive" : "default"}
							className="lg:ml-auto"
							onClick={toggleGoogleAccount}
							disabled={isPending}
						>
							{isGoogleConnected ? <UnlinkIcon /> : <LinkIcon />}
							{isGoogleConnected ? "Disconnect" : "Connect"}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
