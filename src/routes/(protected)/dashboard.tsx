import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";

export const Route = createFileRoute("/(protected)/dashboard")({
	staticData: {
		breadcrumb: "Dashboard",
	},
	head: () => ({ meta: [{ title: "Dashboard / PABFC" }] }),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-6">
			<PageHeader title="Dashboard" description="Welcome to your dashboard" />
		</div>
	);
}
