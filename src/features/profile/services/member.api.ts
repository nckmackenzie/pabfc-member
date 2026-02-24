import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { format } from "date-fns";
import { and, eq, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/db";
import {
	accounts,
	memberRegistrationLinks,
	members,
	users,
} from "@/drizzle/schema";
import { env } from "@/env/server";
import { ApplicationError } from "@/lib/error-handling/app-error";
import { internationalizePhoneNumber, isValidS3Url } from "@/lib/helpers";
import { generateRandomPassword } from "@/lib/password-helper";
import { sendSms } from "@/lib/sms";
import { authMiddleware } from "@/middlewares/auth-middleware";
import { selfRegistrationFormSchema } from "./schema";

export const getUserInformation = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const user = await db.query.users.findFirst({
			columns: {
				name: true,
				image: true,
				email: true,
				contact: true,
				twoFactorEnabled: true,
			},
			where: eq(users.id, context.user.id),
		});

		return user;
	});

export const completeRegistration = createServerFn({ method: "POST" })
	.inputValidator(selfRegistrationFormSchema)
	.handler(async ({ data }) => {
		const { memberId, shortCode, ...rest } = data;
		// const registration = await db.query.memberRegistrationLinks.findFirst({
		// 	columns: { id: true },
		// 	where: and(
		// 		eq(memberRegistrationLinks.shortCode, shortCode),
		// 		eq(memberRegistrationLinks.memberId, memberId),
		// 		isNull(memberRegistrationLinks.usedAt),
		// 	),
		// });

		if (rest.image && !isValidS3Url(rest.image, env.AWS_S3_PUBLIC_URL)) {
			throw new ApplicationError("Invalid image URL. Must be a valid S3 URL.");
		}

		// if (!registration) {
		// 	throw new ApplicationError(
		// 		"Registration link not found or already used.",
		// 	);
		// }

		// const member = await db.query.members.findFirst({
		// 	where: eq(members.id, memberId),
		// });

		// if (!member) {
		// 	throw new ApplicationError("Member not found.");
		// }

		const password = await generateRandomPassword();

		try {
			const userId = await db.transaction(async (tx) => {
				const [registration] = await tx
					.update(memberRegistrationLinks)
					.set({ usedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss") })
					.where(
						and(
							eq(memberRegistrationLinks.shortCode, shortCode),
							eq(memberRegistrationLinks.memberId, memberId),
							isNull(memberRegistrationLinks.usedAt),
						),
					)
					.returning({ id: memberRegistrationLinks.id });

				if (!registration) {
					throw new ApplicationError(
						"Registration link not found or already used.",
					);
				}

				const member = await tx.query.members.findFirst({
					columns: { firstName: true, lastName: true, contact: true },
					where: eq(members.id, memberId),
				});

				if (!member) {
					throw new ApplicationError("Member not found.");
				}

				await tx
					.update(members)
					.set({
						email: rest.email,
						idType: rest.idType,
						idNumber: rest.idNumber,
						image: rest.image,
						completedRegistration: true,
					})
					.where(eq(members.id, memberId));

				const hashedPassword = await bcrypt.hash(
					password,
					Number(env.BCRYPT_ROUNDS),
				);

				const [{ id }] = await tx
					.insert(users)
					.values({
						id: nanoid(),
						email: rest.email,
						name: `${member.firstName} ${member.lastName}`,
						contact: member.contact as string,
						image: rest.image,
						memberId,
						username: member.contact,
						role: "member",
					})
					.returning({ id: users.id });

				await tx.insert(accounts).values({
					id: nanoid(),
					password: hashedPassword,
					userId: id,
					accountId: id,
					providerId: "credential",
					updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
				});

				try {
					await sendSms({
						to: [internationalizePhoneNumber(member.contact, true)],
						message: `Welcome to PABFC. Your account has been created!! Your password is ${password}. \nLogin at https://member.pabfc.co.ke/sign-in`,
					});
				} catch (smsError) {
					console.error("Failed to send welcome SMS", smsError);
					throw new ApplicationError(
						"Failed to send registration SMS. Your account has NOT been created. Please try again.",
					);
				}

				return id;
			});

			return userId;
		} catch (error) {
			console.error("Member Registration error", error);
			throw new ApplicationError("Failed to complete registration.");
		}
	});
