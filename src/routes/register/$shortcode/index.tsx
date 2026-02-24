import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { ErrorComponent } from "@/components/ui/error-component";
import { db } from "@/db";
import { memberRegistrationLinks, members } from "@/drizzle/schema";
import { SelfRegistrationForm } from "@/features/profile/components/self-registration";

const getRegistrationDetails = createServerFn()
	.inputValidator(z.string().length(6, { error: "Invalid shortcode" }))
	.handler(async ({ data: shortcode }) => {
		const linkDetails = await db.query.memberRegistrationLinks.findFirst({
			columns: { shortCode: true, memberId: true, usedAt: true },
			where: eq(memberRegistrationLinks.shortCode, shortcode),
		});

		if (!linkDetails || linkDetails.usedAt) {
			throw new Error("Invalid registration link. Please contact support.");
		}

		const member = await db.query.members.findFirst({
			columns: { lastName: true, firstName: true },
			where: eq(members.id, linkDetails.memberId),
		});

		if (!member) {
			throw new Error("Invalid registration link. Please contact support.");
		}

		return {
			memberId: linkDetails.memberId,
			fullName: `${member.firstName} ${member.lastName}`,
		};
	});

export const Route = createFileRoute("/register/$shortcode/")({
	component: RouteComponent,
	head: () => ({ meta: [{ title: "Self Registration / PABFC" }] }),
	errorComponent: ({ error }) => (
		<div className="py-4 md:py-6 flex justify-center">
			<ErrorComponent message={error.message} />
		</div>
	),
	loader: async ({ params: { shortcode } }) => {
		const { memberId, fullName } = await getRegistrationDetails({
			data: shortcode,
		});
		return { memberId, fullName };
	},
});

function RouteComponent() {
	return (
		<main className="min-h-dvh py-4">
			<div className="mx-4 max-w-2xl lg:mx-auto border p-4 md:p-6 mt-6 rounded-lg shadow-sm space-y-6">
				<header>
					<h1 className="text-lg md:text-2xl font-bold font-display">
						Member Registration
					</h1>
					<p className="text-sm text-muted-foreground">
						Please enter your details to register for an account.
					</p>
				</header>
				<SelfRegistrationForm />
			</div>
		</main>
	);
}
