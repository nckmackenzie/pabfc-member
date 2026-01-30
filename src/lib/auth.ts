import bcrypt from "bcryptjs";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { twoFactor, username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { nanoid } from "nanoid";
import { UAParser } from "ua-parser-js";
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
				return await bcrypt.hash(password, Number(env.BCRYPT_ROUNDS));
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
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
			if (!ctx.path.startsWith("/sign-in")) return;

			const user = await db.query.users.findFirst({
				columns: { id: true, username: true },
				where: (users, { eq, or, and }) =>
					and(
						eq(users.role, "member"),
						or(
							eq(users.contact, ctx.body.username),
							eq(users.email, ctx.body.username),
							eq(users.username, ctx.body.username),
						),
					),
			});

			if (!user) {
				throw new APIError("BAD_REQUEST", {
					message: "Invalid username or password",
				});
			}

			ctx.context.userId = user.id;
		}),
		after: createAuthMiddleware(async (ctx) => {
			if (!ctx.path.startsWith("/sign-in")) return;
			const userAgent = ctx.request?.headers?.get("user-agent") ?? "unknown";
			const ipAddress =
				ctx.request?.headers?.get("x-forwarded-for") ||
				ctx.request?.headers?.get("x-real-ip") ||
				"127.0.0.1";
			const { browser } = UAParser(userAgent);

			const success = Boolean(ctx.context.newSession);

			await db.insert(schema.loginAttempts).values({
				id: nanoid(),
				userId: ctx.context.newSession?.user.id as string,
				success,
				ipAddress,
				failureReason: success ? undefined : "Invalid username or password",
				userAgent: browser.name || "",
			});
		}),
	},
});
