import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sessions } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { authMiddleware } from "@/middlewares/auth-middleware";

export const getUserAccounts = createServerFn()
	.middleware([authMiddleware])
	.handler(async () => {
		const request = getRequest();
		return auth.api.listUserAccounts({ headers: request.headers });
	});

export const getActiveSessions = createServerFn()
	.middleware([authMiddleware])
	.handler(
		async ({
			context: {
				user: { id },
			},
		}) => {
			return db.query.sessions.findMany({
				where: eq(sessions.userId, id),
				orderBy: (sessions, { desc }) => [desc(sessions.createdAt)],
			});
		},
	);
