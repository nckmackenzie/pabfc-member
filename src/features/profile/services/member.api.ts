import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { members, users } from "@/drizzle/schema";
import { NotFoundError } from "@/lib/error-handling/app-error";
import { authMiddleware } from "@/middlewares/auth-middleware";

export const getMemberInformation = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const memberId = await db.query.users.findFirst({
			columns: { memberId: true },
			where: eq(users.id, context.user.id),
		});

		if (!memberId || !memberId.memberId) throw redirect({ to: "/sign-in" });

		const member = await db.query.members.findFirst({
			columns: {
				lastName: true,
				firstName: true,
				contact: true,
				email: true,
				image: true,
			},
			where: eq(members.id, memberId.memberId),
		});

		if (!member) throw new NotFoundError("Member info");

		return member;
	});
