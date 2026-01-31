import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		VITE_BASE_URL: z.url().default("http://localhost:3000"),
		BETTER_AUTH_SECRET: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string().optional(),
		GOOGLE_CLIENT_SECRET: z.string().optional(),
		BCRYPT_ROUNDS: z.string().default("10"),
		MPESA_CONSUMER_KEY: z.string().min(1),
		MPESA_CONSUMER_SECRET: z.string().min(1),
		MPESA_ENV: z.string().min(1),
		MPESA_SHORTCODE: z.string().min(1),
		MPESA_PASSKEY: z.string().min(1),
		MPESA_CALLBACK_DOMAIN: z.string().min(1),
		MPESA_CONFIRMATION_URL: z.string().min(1),
		MPESA_VALIDATION_URL: z.string().min(1),
		AWS_ACCESS_KEY_ID: z.string().min(1),
		AWS_SECRET_ACCESS_KEY: z.string().min(1),
		AWS_DEFAULT_REGION: z.string().min(1),
		AWS_BUCKET: z.string().min(1),
		AWS_USE_PATH_STYLE_ENDPOINT: z.string().min(1),
		AWS_S3_PUBLIC_URL: z.string().min(1),
		RESEND_API_KEY: z.string().min(1),
	},
	runtimeEnv: process.env,
});
