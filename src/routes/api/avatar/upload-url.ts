import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth";
import { generatePresignedUploadUrl } from "@/lib/s3";

export const Route = createFileRoute("/api/avatar/upload-url")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const session = await auth.api.getSession({ headers: request.headers });

				if (!session?.user) {
					return new Response("Unauthorized", { status: 401 });
				}

				try {
					const body = await request.json();
					const { fileType, fileSize } = body;

					const result = await generatePresignedUploadUrl(
						session.user.id,
						fileType,
						fileSize,
					);

					return Response.json(result);
				} catch (error) {
					return Response.json(
						{
							error:
								error instanceof Error
									? error.message
									: "Failed to generate upload URL",
						},
						{ status: 400 },
					);
				}
			},
		},
	},
});
