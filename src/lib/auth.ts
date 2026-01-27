import bcrypt from "bcryptjs";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor, username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/db";
import * as schema from "@/drizzle/schema";
import { env } from "@/env/server";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema: {
			users: schema.users,
			accounts: schema.accounts,
			sessions: schema.sessions,
			verifications: schema.verifications,
		},
	}),
	baseURL: env.VITE_BASE_URL,
	experimental: { joins: true },
	account: {
		accountLinking: { enabled: true },
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	user: {
		additionalFields: {
			contact: {
				type: "string",
				required: true,
				input: true,
			},
			role: {
				type: "string",
				required: true,
				defaultValue: "user",
				input: true,
			},
			active: {
				type: "boolean",
				required: true,
				defaultValue: true,
				input: false,
			},
			deletedAt: {
				type: "date",
				required: false,
				fieldName: "deleted_at",
				returned: false,
				input: false,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		autoSignIn: true,
		password: {
			hash: async (password: string) => {
				return await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
			},
			verify: async ({
				hash,
				password,
			}: {
				password: string;
				hash: string;
			}) => {
				return await bcrypt.compare(password, hash);
			},
		},
	},
	plugins: [twoFactor(), username(), tanstackStartCookies()],
});
