import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/payments/")({
	head: () => ({ meta: [{ title: "Payments / PABFC" }] }),
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(protected)/payments/"!</div>;
}
