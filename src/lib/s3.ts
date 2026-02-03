import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { env } from "@/env/server";

const s3Client = new S3Client({
	region: env.AWS_DEFAULT_REGION,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
	},
});

const BUCKET_NAME = env.AWS_BUCKET;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function generatePresignedUploadUrl(
	userId: string,
	fileType: string,
	fileSize: number,
) {
	if (!ALLOWED_TYPES.includes(fileType)) {
		throw new Error(
			"Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
		);
	}
	if (fileSize > MAX_FILE_SIZE) {
		throw new Error("File size exceeds 5MB limit.");
	}

	const extension = fileType.split("/")[1];
	const filename = `avatars/${userId}/${randomUUID()}.${extension}`;

	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: filename,
		ContentType: fileType,
		ContentLength: fileSize,
	});

	const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minutes

	return {
		uploadUrl,
		fileKey: filename,
		publicUrl: `https://${BUCKET_NAME}.s3.${env.AWS_DEFAULT_REGION}.amazonaws.com/${filename}`,
	};
}

export async function deleteAvatar(fileUrl: string) {
	try {
		const url = new URL(fileUrl);
		const key = url.pathname.substring(1);

		const command = new DeleteObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
		});

		await s3Client.send(command);
		return true;
	} catch (error) {
		console.error("Error deleting avatar:", error);
		return false;
	}
}
