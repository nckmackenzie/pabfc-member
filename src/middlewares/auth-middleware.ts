import { createMiddleware } from "@tanstack/react-start";

import { AuthenticationError } from "@/lib/error-handling/app-error";
import { getUserSession } from "@/lib/session/session.api";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const session = await getUserSession();

	if (!session?.user || session.user.role !== "member") {
		throw new AuthenticationError("Please log in to continue");
	}

	return next({
		context: {
			...session,
		},
	});
});
