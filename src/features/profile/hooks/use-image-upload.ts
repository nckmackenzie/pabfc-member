import { useMutation } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";

interface UploadUrlResponse {
	uploadUrl: string;
	fileKey: string;
	publicUrl: string;
}

interface AvatarUpdateResponse {
	success: boolean;
	avatarUrl: string;
}

async function optimizeImage(file: File): Promise<File> {
	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 512,
		useWebWorker: true,
		fileType: "image/webp",
	};

	try {
		const compressedFile = await imageCompression(file, options);
		return compressedFile;
	} catch (error) {
		console.warn("Image compression failed, using original:", error);
		return file;
	}
}

async function getUploadUrl(file: File): Promise<UploadUrlResponse> {
	const response = await fetch("/api/avatar/upload-url", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			fileType: file.type,
			fileSize: file.size,
		}),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to get upload URL");
	}

	return response.json();
}

async function uploadToS3(url: string, file: File): Promise<void> {
	const response = await fetch(url, {
		method: "PUT",
		body: file,
		headers: {
			"Content-Type": file.type,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to upload image to S3");
	}
}

async function updateAvatarInDb(
	avatarUrl: string,
): Promise<AvatarUpdateResponse> {
	const response = await fetch("/api/avatar/update", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ avatarUrl }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to update avatar");
	}

	return response.json();
}

export function useAvatarUpload() {
	return useMutation({
		mutationFn: async (file: File) => {
			const optimizedFile = await optimizeImage(file);

			const { uploadUrl, publicUrl } = await getUploadUrl(optimizedFile);
			await uploadToS3(uploadUrl, optimizedFile);

			await updateAvatarInDb(publicUrl);

			return publicUrl;
		},
	});
}
