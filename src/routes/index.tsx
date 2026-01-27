import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	beforeLoad: ({ context }) => {
		if (!context.userSession) {
			redirect({ to: "/sign-in", throw: true });
		} else {
			redirect({ to: "/dashboard", throw: true });
		}
	},
});
