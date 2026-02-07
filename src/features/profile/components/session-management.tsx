import { getRouteApi, redirect } from "@tanstack/react-router";
import type { Session } from "better-auth";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function SessionManagement() {
	const { activeSessions } = getRouteApi(
		"/(protected)/profile/",
	).useLoaderData();
	const { data: session, isPending } = authClient.useSession();

	if (isPending) return <div>Loading...</div>;
	if (!session) {
		throw redirect({ to: "/sign-in" });
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Active Sessions</CardTitle>
				<CardDescription>Manage your active sessions</CardDescription>
			</CardHeader>
			<CardContent>
				{activeSessions.map((s) => (
					<SessionItem
						key={s.id}
						session={s}
						isCurrent={s.id === session.session.id}
					/>
				))}
			</CardContent>
		</Card>
	);
}

function SessionItem({
	session,
	isCurrent,
}: {
	session: Session;
	isCurrent: boolean;
}) {
	return (
		<div className="border rounded-md p-4">
			<div className="flex items-center justify-between">
				<div>
					<div className="text-lg font-medium">Session</div>
					<div className="text-sm text-muted-foreground">Session</div>
				</div>
				<Button variant="destructive">Revoke</Button>
			</div>
		</div>
	);
}
