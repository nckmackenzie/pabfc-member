import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/check-ins/")({
	head: () => ({ meta: [{ title: "Check Ins / PABFC" }] }),
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(protected)/check-ins/"!</div>;
}
