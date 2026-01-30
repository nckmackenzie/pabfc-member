import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/dashboard")({
	staticData: {
		breadcrumb: "Dashboard",
	},
	head: () => ({ meta: [{ title: "Dashboard / PABFC" }] }),
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Dashboard</div>;
}
