import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
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
	.handler(async () => {
		const request = getRequest();
		return auth.api.listSessions({ headers: request.headers });
	});
