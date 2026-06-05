import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { sanitizeRedirect } from "@/hooks/use-previous-location";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: async ({ search, context }) => {
		const safe = sanitizeRedirect(search.redirectTo ?? "/payments");
		if (context.userSession) {
			throw redirect({ to: safe });
		}
		return { safeRedirectTo: safe };
	},
	component: RouteComponent,
	validateSearch: z.object({
		redirectTo: z.string().optional().catch("/payments"),
	}),
});

function RouteComponent() {
	return <Outlet />;
}
