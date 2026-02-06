import {
	inferAdditionalFields,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/env/client";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
	plugins: [
		twoFactorClient({
			onTwoFactorRedirect: () => {
				window.location.href = "/auth/2fa";
			},
		}),
		usernameClient(),
		inferAdditionalFields<typeof auth>(),
	],
});
