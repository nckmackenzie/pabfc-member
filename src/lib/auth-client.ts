import {
	inferAdditionalFields,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_BASE_URL as string,
	plugins: [
		twoFactorClient({
			onTwoFactorRedirect: () => {
				window.location.href = "/2fa";
			},
		}),
		usernameClient(),
		inferAdditionalFields<typeof auth>(),
	],
});
