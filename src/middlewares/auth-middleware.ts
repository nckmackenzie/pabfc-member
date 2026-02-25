import { createMiddleware } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/drizzle/schema";
import { AuthenticationError } from "@/lib/error-handling/app-error";
import { getUserSession } from "@/lib/session/session.api";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const session = await getUserSession();

	if (!session?.user || session.user.role !== "member") {
		throw new AuthenticationError("Please log in to continue");
	}
	const user = await db.query.users.findFirst({
		columns: { memberId: true },
		where: eq(users.id, session.user.id),
	});

	if (!user || !user.memberId) {
		throw new AuthenticationError("Please log in to continue");
	}

	return next({
		context: {
			...session,
			memberId: user.memberId,
		},
	});
});
