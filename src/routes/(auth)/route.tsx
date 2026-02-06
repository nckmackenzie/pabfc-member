import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { sanitizeRedirect } from "@/hooks/use-previous-location";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: async ({ search, context }) => {
		const safe = sanitizeRedirect(search.redirectTo ?? "/dashboard");
		if (context.userSession) {
			throw redirect({ to: safe });
		}
		return { safeRedirectTo: safe };
	},
	component: RouteComponent,
	validateSearch: z.object({
		redirectTo: z.string().optional().catch("/member/dashboard"),
	}),
});

function RouteComponent() {
	return <Outlet />;
}
