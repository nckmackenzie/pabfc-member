import { createFileRoute } from "@tanstack/react-router";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { members, users } from "@/drizzle/schema";
import { env } from "@/env/server";
import { auth } from "@/lib/auth";
import { deleteAvatar } from "@/lib/s3";

export const Route = createFileRoute("/api/avatar/update")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const session = await auth.api.getSession({ headers: request.headers });

				if (!session?.user) {
					return new Response("Unauthorized", { status: 401 });
				}

				try {
					const body = await request.json();
					const { avatarUrl } = body;

					const [currentUser] = await db
						.select()
						.from(users)
						.where(eq(users.id, session.user.id))
						.limit(1);

					if (currentUser?.image?.includes(env.AWS_BUCKET)) {
						await deleteAvatar(currentUser.image);
					}

					await auth.api.updateUser({
						headers: request.headers,
						body: {
							image: avatarUrl,
						},
					});

					await db
						.update(members)
						.set({ image: avatarUrl })
						.where(eq(members.id, currentUser.memberId as string));

					return Response.json({ success: true, avatarUrl });
				} catch (error) {
					console.log(error);
					return Response.json(
						{ error: "Failed to update avatar" },
						{ status: 500 },
					);
				}
			},
		},
	},
});
