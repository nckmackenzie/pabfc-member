import { relations } from "drizzle-orm/relations";
import {
	accounts,
	activityLogs,
	attendanceLogs,
	customerInvoiceLines,
	customerInvoices,
	expenseAttachments,
	expenseDetails,
	expenseHeaders,
	journalEntries,
	journalLines,
	ledgerAccounts,
	loginAttempts,
	memberMemberships,
	members,
	membershipPlans,
	mpesaStkRequests,
	payees,
	paymentApplications,
	payments,
	sessions,
	settings,
	smsBroadcasts,
	smsLogs,
	smsTemplates,
	twoFactors,
	users,
} from "./schema";

export const memberMembershipsRelations = relations(
	memberMemberships,
	({ one, many }) => ({
		member: one(members, {
			fields: [memberMemberships.memberId],
			references: [members.id],
		}),
		membershipPlan: one(membershipPlans, {
			fields: [memberMemberships.membershipPlanId],
			references: [membershipPlans.id],
		}),
		customerInvoiceLines: many(customerInvoiceLines),
	}),
);

export const membersRelations = relations(members, ({ many }) => ({
	memberMemberships: many(memberMemberships),
	attendanceLogs: many(attendanceLogs),
	customerInvoices: many(customerInvoices),
	mpesaStkRequests: many(mpesaStkRequests),
	payments: many(payments),
}));

export const membershipPlansRelations = relations(
	membershipPlans,
	({ one, many }) => ({
		memberMemberships: many(memberMemberships),
		ledgerAccount: one(ledgerAccounts, {
			fields: [membershipPlans.revenueAccountId],
			references: [ledgerAccounts.id],
		}),
		customerInvoiceLines: many(customerInvoiceLines),
		payments: many(payments),
	}),
);

export const attendanceLogsRelations = relations(attendanceLogs, ({ one }) => ({
	member: one(members, {
		fields: [attendanceLogs.memberId],
		references: [members.id],
	}),
}));

export const ledgerAccountsRelations = relations(
	ledgerAccounts,
	({ many }) => ({
		membershipPlans: many(membershipPlans),
		journalLines: many(journalLines),
		customerInvoiceLines_revenueAccountId: many(customerInvoiceLines, {
			relationName: "customerInvoiceLines_revenueAccountId_ledgerAccounts_id",
		}),
		customerInvoiceLines_taxAccountId: many(customerInvoiceLines, {
			relationName: "customerInvoiceLines_taxAccountId_ledgerAccounts_id",
		}),
		expenseDetails: many(expenseDetails),
	}),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	twoFactors: many(twoFactors),
	accounts: many(accounts),
	loginAttempts: many(loginAttempts),
	activityLogs: many(activityLogs),
	settings_createdBy: many(settings, {
		relationName: "settings_createdBy_users_id",
	}),
	settings_updatedBy: many(settings, {
		relationName: "settings_updatedBy_users_id",
	}),
	expenseHeaders: many(expenseHeaders),
}));

export const twoFactorsRelations = relations(twoFactors, ({ one }) => ({
	user: one(users, {
		fields: [twoFactors.userId],
		references: [users.id],
	}),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));

export const journalLinesRelations = relations(journalLines, ({ one }) => ({
	journalEntry: one(journalEntries, {
		fields: [journalLines.journalEntryId],
		references: [journalEntries.id],
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [journalLines.accountId],
		references: [ledgerAccounts.id],
	}),
}));

export const journalEntriesRelations = relations(
	journalEntries,
	({ many }) => ({
		journalLines: many(journalLines),
	}),
);

export const customerInvoicesRelations = relations(
	customerInvoices,
	({ one, many }) => ({
		member: one(members, {
			fields: [customerInvoices.memberId],
			references: [members.id],
		}),
		customerInvoiceLines: many(customerInvoiceLines),
		paymentApplications: many(paymentApplications),
		mpesaStkRequests: many(mpesaStkRequests),
	}),
);

export const loginAttemptsRelations = relations(loginAttempts, ({ one }) => ({
	user: one(users, {
		fields: [loginAttempts.userId],
		references: [users.id],
	}),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
	user: one(users, {
		fields: [activityLogs.userId],
		references: [users.id],
	}),
}));

export const settingsRelations = relations(settings, ({ one }) => ({
	user_createdBy: one(users, {
		fields: [settings.createdBy],
		references: [users.id],
		relationName: "settings_createdBy_users_id",
	}),
	user_updatedBy: one(users, {
		fields: [settings.updatedBy],
		references: [users.id],
		relationName: "settings_updatedBy_users_id",
	}),
}));

export const customerInvoiceLinesRelations = relations(
	customerInvoiceLines,
	({ one }) => ({
		customerInvoice: one(customerInvoices, {
			fields: [customerInvoiceLines.invoiceId],
			references: [customerInvoices.id],
		}),
		membershipPlan: one(membershipPlans, {
			fields: [customerInvoiceLines.planId],
			references: [membershipPlans.id],
		}),
		memberMembership: one(memberMemberships, {
			fields: [customerInvoiceLines.membershipId],
			references: [memberMemberships.id],
		}),
		ledgerAccount_revenueAccountId: one(ledgerAccounts, {
			fields: [customerInvoiceLines.revenueAccountId],
			references: [ledgerAccounts.id],
			relationName: "customerInvoiceLines_revenueAccountId_ledgerAccounts_id",
		}),
		ledgerAccount_taxAccountId: one(ledgerAccounts, {
			fields: [customerInvoiceLines.taxAccountId],
			references: [ledgerAccounts.id],
			relationName: "customerInvoiceLines_taxAccountId_ledgerAccounts_id",
		}),
	}),
);

export const paymentApplicationsRelations = relations(
	paymentApplications,
	({ one }) => ({
		payment: one(payments, {
			fields: [paymentApplications.paymentId],
			references: [payments.id],
		}),
		customerInvoice: one(customerInvoices, {
			fields: [paymentApplications.invoiceId],
			references: [customerInvoices.id],
		}),
	}),
);

export const paymentsRelations = relations(payments, ({ one, many }) => ({
	paymentApplications: many(paymentApplications),
	mpesaStkRequests: many(mpesaStkRequests),
	member: one(members, {
		fields: [payments.memberId],
		references: [members.id],
	}),
	membershipPlan: one(membershipPlans, {
		fields: [payments.planId],
		references: [membershipPlans.id],
	}),
}));

export const mpesaStkRequestsRelations = relations(
	mpesaStkRequests,
	({ one }) => ({
		member: one(members, {
			fields: [mpesaStkRequests.memberId],
			references: [members.id],
		}),
		customerInvoice: one(customerInvoices, {
			fields: [mpesaStkRequests.invoiceId],
			references: [customerInvoices.id],
		}),
		payment: one(payments, {
			fields: [mpesaStkRequests.paymentId],
			references: [payments.id],
		}),
	}),
);

export const expenseHeadersRelations = relations(
	expenseHeaders,
	({ one, many }) => ({
		payee: one(payees, {
			fields: [expenseHeaders.payeeId],
			references: [payees.id],
		}),
		user: one(users, {
			fields: [expenseHeaders.createdByUserId],
			references: [users.id],
		}),
		expenseDetails: many(expenseDetails),
		expenseAttachments: many(expenseAttachments),
	}),
);

export const payeesRelations = relations(payees, ({ many }) => ({
	expenseHeaders: many(expenseHeaders),
}));

export const expenseDetailsRelations = relations(expenseDetails, ({ one }) => ({
	expenseHeader: one(expenseHeaders, {
		fields: [expenseDetails.expenseHeaderId],
		references: [expenseHeaders.id],
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [expenseDetails.accountId],
		references: [ledgerAccounts.id],
	}),
}));

export const expenseAttachmentsRelations = relations(
	expenseAttachments,
	({ one }) => ({
		expenseHeader: one(expenseHeaders, {
			fields: [expenseAttachments.expenseHeaderId],
			references: [expenseHeaders.id],
		}),
	}),
);

export const smsLogsRelations = relations(smsLogs, ({ one }) => ({
	smsTemplate: one(smsTemplates, {
		fields: [smsLogs.templateId],
		references: [smsTemplates.id],
	}),
}));

export const smsTemplatesRelations = relations(smsTemplates, ({ many }) => ({
	smsLogs: many(smsLogs),
	smsBroadcasts: many(smsBroadcasts),
}));

export const smsBroadcastsRelations = relations(smsBroadcasts, ({ one }) => ({
	smsTemplate: one(smsTemplates, {
		fields: [smsBroadcasts.smsTemplateId],
		references: [smsTemplates.id],
	}),
}));
