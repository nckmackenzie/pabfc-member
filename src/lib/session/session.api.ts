import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/drizzle/schema";
import { auth } from "@/lib/auth";

export const getUserSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const request = getRequest();

		if (!request?.headers) {
			return null;
		}

		const userSession = await auth.api.getSession({ headers: request.headers });

		if (!userSession) return null;

		return { user: userSession.user, session: userSession.session };
	},
);

export const getMemberId = createServerFn({ method: "GET" })
	.inputValidator((userId: string) => userId)
	.handler(async ({ data: userId }) => {
		const member = await db.query.users.findFirst({
			columns: { memberId: true },
			where: eq(users.id, userId),
		});

		if (!member?.memberId) throw redirect({ to: "/sign-in" });

		return member.memberId;
	});
