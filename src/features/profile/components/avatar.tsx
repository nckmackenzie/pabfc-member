/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <> */
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface AvatarUploadProps {
	currentAvatar?: string | null;
	onImageSelect?: (file: File | null) => void;
	pendingImage?: string | null;
	disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = {
	"image/jpeg": [".jpg", ".jpeg"],
	"image/png": [".png"],
	"image/webp": [".webp"],
	"image/gif": [".gif"],
};

export function AvatarUpload({
	currentAvatar,
	onImageSelect,
	pendingImage,
	disabled,
}: AvatarUploadProps) {
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (pendingImage === null) {
			setPreview(null);
		}
	}, [pendingImage]);

	const onDrop = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: <>
		(acceptedFiles: File[], rejectedFiles: any[]) => {
			setError(null);

			if (rejectedFiles.length > 0) {
				const rejection = rejectedFiles[0];
				if (rejection.errors[0]?.code === "file-too-large") {
					setError("File size must be less than 5MB");
				} else if (rejection.errors[0]?.code === "file-invalid-type") {
					setError(
						"Please select a valid image file (JPEG, PNG, WebP, or GIF)",
					);
				} else {
					setError("Invalid file. Please try again.");
				}
				return;
			}

			const file = acceptedFiles[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
					onImageSelect?.(file);
				};
				reader.readAsDataURL(file);
			}
		},
		[onImageSelect],
	);

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDrop,
		accept: ACCEPTED_TYPES,
		maxSize: MAX_FILE_SIZE,
		maxFiles: 1,
		multiple: false,
		noClick: true,
		noKeyboard: true,
		disabled,
	});

	const handleRemove = () => {
		setPreview(null);
		setError(null);
		onImageSelect?.(null);
	};

	const displayImage = preview || pendingImage || currentAvatar;
	const hasChanges = !!preview;

	return (
		<div className="space-y-4">
			<div
				{...getRootProps()}
				className={`
          flex items-center gap-6 p-4 rounded-lg border-2 border-dashed transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        `}
			>
				<input {...getInputProps()} />

				<div className="relative flex-shrink-0">
					<div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300 relative">
						{displayImage ? (
							<img
								src={displayImage}
								alt="Avatar"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray-400">
								<svg
									className="w-12 h-12"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						)}
					</div>

					{/* Change indicator */}
					{hasChanges && (
						<div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
							<svg
								className="w-4 h-4 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					)}
				</div>

				<div className="flex-1">
					<div className="flex flex-col gap-2">
						<button
							type="button"
							onClick={open}
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
						>
							{hasChanges ? "Choose Different Image" : "Change Avatar"}
						</button>

						{hasChanges && (
							<button
								type="button"
								onClick={handleRemove}
								className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
							>
								Remove Preview
							</button>
						)}
					</div>

					{isDragActive ? (
						<p className="text-sm text-blue-600 mt-2">
							Drop your image here...
						</p>
					) : (
						<p className="text-sm text-gray-500 mt-2">
							or drag and drop an image here
						</p>
					)}
				</div>
			</div>

			{error && (
				<div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
					<svg
						className="w-5 h-5 flex-shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
					<span>{error}</span>
				</div>
			)}

			<div className="flex items-start gap-2 text-sm text-gray-600">
				<svg
					className="w-5 h-5 flex-shrink-0 mt-0.5"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clipRule="evenodd"
					/>
				</svg>
				<p>
					Square image recommended, at least 200&times;200px. Max 5MB. Image
					will be automatically optimized.
				</p>
			</div>
		</div>
	);
}
