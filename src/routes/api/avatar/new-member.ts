import { createFileRoute } from "@tanstack/react-router";
import { generatePresignedUploadUrl } from "@/lib/s3";

export const Route = createFileRoute("/api/avatar/new-member")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = await request.json();
					const { fileType, fileSize, memberId } = body;

					const result = await generatePresignedUploadUrl(
						memberId,
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
