import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/drizzle/schema";
import { authMiddleware } from "@/middlewares/auth-middleware";

export const getUserInformation = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const user = await db.query.users.findFirst({
			columns: { name: true, image: true, email: true, contact: true },
			where: eq(users.id, context.user.id),
		});

		return user;
	});
