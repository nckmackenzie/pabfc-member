import { relations } from "drizzle-orm/relations";
import { users, accounts, activityLogs, ledgerAccounts, addons, addonInvoiceLines, addonInvoices, members, payments, attendanceLogs, bankAccounts, bankPostings, biotimePersonProfiles, accessControlSyncJobs, employees, billPayments, vendors, bills, billPaymentLines, creditNoteRedemptions, creditNotes, memberMemberships, customerInvoices, employeeGymAccessLogs, employeeLeaveBalances, employeeLoans, journalEntries, complimentaryMembershipRequests, membershipPlans, expenseDetails, expenseHeaders, journalLines, leaveBalanceAdjustments, payees, ledgerAccountMappings, leaveRequests, memberAccessProfiles, memberRegistrationLinks, membershipUpgrades, mpesaStkRequests, overtimeRecords, payrollPeriods, paymentApplications, passwordResetAttempts, passwordResetChallenges, loanRepayments, payrollSlips, loginAttempts, payrollAccountMappings, salaryStructures, salaryAdvances, payrollDeductions, payrollPeriodBonuses, payrollPeriodOtherDeductions, payrollRemittanceLineItems, paymentMembers, salaryAdvanceRecoveries, recurringBillsSchedules, settings, smsTemplates, smsLogs, statutoryRates, whtCorrectionLines, whtCorrections, whtRemittances, whtRemittanceLines, accessControlSyncAttempts, departments, billItems, customerInvoiceLines, expenseAttachments, sessions, smsBroadcasts, twoFactors } from "./schema";

export const accountsRelations = relations(accounts, ({one}) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	accounts: many(accounts),
	activityLogs: many(activityLogs),
	billPayments: many(billPayments),
	bills: many(bills),
	creditNotes: many(creditNotes),
	employeeLoans_approvedBy: many(employeeLoans, {
		relationName: "employeeLoans_approvedBy_users_id"
	}),
	employeeLoans_pausedBy: many(employeeLoans, {
		relationName: "employeeLoans_pausedBy_users_id"
	}),
	employeeLoans_rejectedBy: many(employeeLoans, {
		relationName: "employeeLoans_rejectedBy_users_id"
	}),
	employeeLoans_resumedBy: many(employeeLoans, {
		relationName: "employeeLoans_resumedBy_users_id"
	}),
	complimentaryMembershipRequests_requestedByUserId: many(complimentaryMembershipRequests, {
		relationName: "complimentaryMembershipRequests_requestedByUserId_users_id"
	}),
	complimentaryMembershipRequests_reviewedByUserId: many(complimentaryMembershipRequests, {
		relationName: "complimentaryMembershipRequests_reviewedByUserId_users_id"
	}),
	leaveBalanceAdjustments: many(leaveBalanceAdjustments),
	expenseHeaders: many(expenseHeaders),
	leaveRequests_approvedBy: many(leaveRequests, {
		relationName: "leaveRequests_approvedBy_users_id"
	}),
	leaveRequests_cancelledBy: many(leaveRequests, {
		relationName: "leaveRequests_cancelledBy_users_id"
	}),
	leaveRequests_requestedBy: many(leaveRequests, {
		relationName: "leaveRequests_requestedBy_users_id"
	}),
	membershipUpgrades: many(membershipUpgrades),
	overtimeRecords_approvedBy: many(overtimeRecords, {
		relationName: "overtimeRecords_approvedBy_users_id"
	}),
	overtimeRecords_createdBy: many(overtimeRecords, {
		relationName: "overtimeRecords_createdBy_users_id"
	}),
	passwordResetAttempts: many(passwordResetAttempts),
	passwordResetChallenges: many(passwordResetChallenges),
	loginAttempts: many(loginAttempts),
	payrollSlips_approvedBy: many(payrollSlips, {
		relationName: "payrollSlips_approvedBy_users_id"
	}),
	payrollSlips_cancelledBy: many(payrollSlips, {
		relationName: "payrollSlips_cancelledBy_users_id"
	}),
	payrollPeriodBonuses: many(payrollPeriodBonuses),
	payrollPeriodOtherDeductions: many(payrollPeriodOtherDeductions),
	payrollPeriods_approvedBy: many(payrollPeriods, {
		relationName: "payrollPeriods_approvedBy_users_id"
	}),
	payrollPeriods_cancelledBy: many(payrollPeriods, {
		relationName: "payrollPeriods_cancelledBy_users_id"
	}),
	payrollPeriods_createdBy: many(payrollPeriods, {
		relationName: "payrollPeriods_createdBy_users_id"
	}),
	payments_createdByUserId: many(payments, {
		relationName: "payments_createdByUserId_users_id"
	}),
	payments_voidedByUserId: many(payments, {
		relationName: "payments_voidedByUserId_users_id"
	}),
	settings_createdBy: many(settings, {
		relationName: "settings_createdBy_users_id"
	}),
	settings_updatedBy: many(settings, {
		relationName: "settings_updatedBy_users_id"
	}),
	statutoryRates: many(statutoryRates),
	salaryAdvances_approvedBy: many(salaryAdvances, {
		relationName: "salaryAdvances_approvedBy_users_id"
	}),
	salaryAdvances_cancelledBy: many(salaryAdvances, {
		relationName: "salaryAdvances_cancelledBy_users_id"
	}),
	salaryAdvances_rejectedBy: many(salaryAdvances, {
		relationName: "salaryAdvances_rejectedBy_users_id"
	}),
	salaryStructures: many(salaryStructures),
	whtRemittances: many(whtRemittances),
	sessions: many(sessions),
	whtCorrections: many(whtCorrections),
	twoFactors: many(twoFactors),
}));

export const activityLogsRelations = relations(activityLogs, ({one}) => ({
	user: one(users, {
		fields: [activityLogs.userId],
		references: [users.id]
	}),
}));

export const addonsRelations = relations(addons, ({one, many}) => ({
	ledgerAccount: one(ledgerAccounts, {
		fields: [addons.revenueAccountId],
		references: [ledgerAccounts.id]
	}),
	addonInvoiceLines: many(addonInvoiceLines),
}));

export const ledgerAccountsRelations = relations(ledgerAccounts, ({many}) => ({
	addons: many(addons),
	addonInvoiceLines: many(addonInvoiceLines),
	bankAccounts: many(bankAccounts),
	bankPostings: many(bankPostings),
	billPayments: many(billPayments),
	employeeLoans: many(employeeLoans),
	expenseDetails: many(expenseDetails),
	journalLines: many(journalLines),
	expenseHeaders: many(expenseHeaders),
	ledgerAccountMappings: many(ledgerAccountMappings),
	membershipPlans: many(membershipPlans),
	payrollAccountMappings: many(payrollAccountMappings),
	salaryAdvances: many(salaryAdvances),
	whtRemittances: many(whtRemittances),
	billItems: many(billItems),
	customerInvoiceLines_revenueAccountId: many(customerInvoiceLines, {
		relationName: "customerInvoiceLines_revenueAccountId_ledgerAccounts_id"
	}),
	customerInvoiceLines_taxAccountId: many(customerInvoiceLines, {
		relationName: "customerInvoiceLines_taxAccountId_ledgerAccounts_id"
	}),
	whtCorrections: many(whtCorrections),
}));

export const addonInvoiceLinesRelations = relations(addonInvoiceLines, ({one}) => ({
	addon: one(addons, {
		fields: [addonInvoiceLines.addonId],
		references: [addons.id]
	}),
	addonInvoice: one(addonInvoices, {
		fields: [addonInvoiceLines.addonInvoiceId],
		references: [addonInvoices.id]
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [addonInvoiceLines.revenueAccountId],
		references: [ledgerAccounts.id]
	}),
}));

export const addonInvoicesRelations = relations(addonInvoices, ({one, many}) => ({
	addonInvoiceLines: many(addonInvoiceLines),
	member: one(members, {
		fields: [addonInvoices.memberId],
		references: [members.id]
	}),
	payment: one(payments, {
		fields: [addonInvoices.paymentId],
		references: [payments.id]
	}),
	creditNoteRedemptions: many(creditNoteRedemptions),
}));

export const membersRelations = relations(members, ({many}) => ({
	addonInvoices: many(addonInvoices),
	attendanceLogs: many(attendanceLogs),
	accessControlSyncJobs: many(accessControlSyncJobs),
	biotimePersonProfiles: many(biotimePersonProfiles),
	creditNotes: many(creditNotes),
	customerInvoices: many(customerInvoices),
	complimentaryMembershipRequests: many(complimentaryMembershipRequests),
	memberAccessProfiles: many(memberAccessProfiles),
	memberRegistrationLinks: many(memberRegistrationLinks),
	membershipUpgrades: many(membershipUpgrades),
	memberMemberships: many(memberMemberships),
	mpesaStkRequests: many(mpesaStkRequests),
	paymentMembers: many(paymentMembers),
	payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({one, many}) => ({
	addonInvoices: many(addonInvoices),
	creditNoteRedemptions: many(creditNoteRedemptions),
	creditNotes: many(creditNotes),
	complimentaryMembershipRequests: many(complimentaryMembershipRequests),
	membershipUpgrades_originalPaymentId: many(membershipUpgrades, {
		relationName: "membershipUpgrades_originalPaymentId_payments_id"
	}),
	membershipUpgrades_upgradePaymentId: many(membershipUpgrades, {
		relationName: "membershipUpgrades_upgradePaymentId_payments_id"
	}),
	mpesaStkRequests: many(mpesaStkRequests),
	paymentApplications: many(paymentApplications),
	paymentMembers: many(paymentMembers),
	user_createdByUserId: one(users, {
		fields: [payments.createdByUserId],
		references: [users.id],
		relationName: "payments_createdByUserId_users_id"
	}),
	member: one(members, {
		fields: [payments.memberId],
		references: [members.id]
	}),
	membershipPlan: one(membershipPlans, {
		fields: [payments.planId],
		references: [membershipPlans.id]
	}),
	user_voidedByUserId: one(users, {
		fields: [payments.voidedByUserId],
		references: [users.id],
		relationName: "payments_voidedByUserId_users_id"
	}),
}));

export const attendanceLogsRelations = relations(attendanceLogs, ({one}) => ({
	member: one(members, {
		fields: [attendanceLogs.memberId],
		references: [members.id]
	}),
}));

export const bankAccountsRelations = relations(bankAccounts, ({one, many}) => ({
	ledgerAccount: one(ledgerAccounts, {
		fields: [bankAccounts.accountId],
		references: [ledgerAccounts.id]
	}),
	bankPostings: many(bankPostings),
	billPayments: many(billPayments),
	expenseHeaders: many(expenseHeaders),
	whtRemittances: many(whtRemittances),
	whtCorrections: many(whtCorrections),
}));

export const bankPostingsRelations = relations(bankPostings, ({one}) => ({
	bankAccount: one(bankAccounts, {
		fields: [bankPostings.bankId],
		references: [bankAccounts.id]
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [bankPostings.counterAccountId],
		references: [ledgerAccounts.id]
	}),
}));

export const accessControlSyncJobsRelations = relations(accessControlSyncJobs, ({one, many}) => ({
	biotimePersonProfile: one(biotimePersonProfiles, {
		fields: [accessControlSyncJobs.biotimePersonProfileId],
		references: [biotimePersonProfiles.id]
	}),
	employee: one(employees, {
		fields: [accessControlSyncJobs.employeeId],
		references: [employees.id]
	}),
	member: one(members, {
		fields: [accessControlSyncJobs.memberId],
		references: [members.id]
	}),
	accessControlSyncAttempts: many(accessControlSyncAttempts),
}));

export const biotimePersonProfilesRelations = relations(biotimePersonProfiles, ({one, many}) => ({
	accessControlSyncJobs: many(accessControlSyncJobs),
	employee: one(employees, {
		fields: [biotimePersonProfiles.employeeId],
		references: [employees.id]
	}),
	member: one(members, {
		fields: [biotimePersonProfiles.memberId],
		references: [members.id]
	}),
}));

export const employeesRelations = relations(employees, ({one, many}) => ({
	accessControlSyncJobs: many(accessControlSyncJobs),
	biotimePersonProfiles: many(biotimePersonProfiles),
	employeeGymAccessLogs: many(employeeGymAccessLogs),
	employeeLeaveBalances: many(employeeLeaveBalances),
	employeeLoans: many(employeeLoans),
	leaveBalanceAdjustments: many(leaveBalanceAdjustments),
	leaveRequests: many(leaveRequests),
	overtimeRecords: many(overtimeRecords),
	loanRepayments: many(loanRepayments),
	payrollSlips: many(payrollSlips),
	payrollDeductions: many(payrollDeductions),
	payrollPeriodBonuses: many(payrollPeriodBonuses),
	payrollPeriodOtherDeductions: many(payrollPeriodOtherDeductions),
	salaryAdvanceRecoveries: many(salaryAdvanceRecoveries),
	salaryAdvances: many(salaryAdvances),
	salaryStructures: many(salaryStructures),
	department: one(departments, {
		fields: [employees.departmentId],
		references: [departments.id]
	}),
}));

export const billPaymentsRelations = relations(billPayments, ({one, many}) => ({
	bankAccount: one(bankAccounts, {
		fields: [billPayments.bankId],
		references: [bankAccounts.id]
	}),
	user: one(users, {
		fields: [billPayments.createdBy],
		references: [users.id]
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [billPayments.creditingAccountId],
		references: [ledgerAccounts.id]
	}),
	vendor: one(vendors, {
		fields: [billPayments.vendorId],
		references: [vendors.id]
	}),
	billPaymentLines: many(billPaymentLines),
}));

export const vendorsRelations = relations(vendors, ({many}) => ({
	billPayments: many(billPayments),
	bills: many(bills),
	recurringBillsSchedules: many(recurringBillsSchedules),
}));

export const billPaymentLinesRelations = relations(billPaymentLines, ({one}) => ({
	bill: one(bills, {
		fields: [billPaymentLines.billId],
		references: [bills.id]
	}),
	billPayment: one(billPayments, {
		fields: [billPaymentLines.billPaymentId],
		references: [billPayments.id]
	}),
}));

export const billsRelations = relations(bills, ({one, many}) => ({
	billPaymentLines: many(billPaymentLines),
	user: one(users, {
		fields: [bills.createdBy],
		references: [users.id]
	}),
	vendor: one(vendors, {
		fields: [bills.vendorId],
		references: [vendors.id]
	}),
	recurringBillsSchedules: many(recurringBillsSchedules),
	whtCorrectionLines: many(whtCorrectionLines),
	whtRemittanceLines: many(whtRemittanceLines),
	billItems: many(billItems),
}));

export const creditNoteRedemptionsRelations = relations(creditNoteRedemptions, ({one}) => ({
	addonInvoice: one(addonInvoices, {
		fields: [creditNoteRedemptions.addonInvoiceId],
		references: [addonInvoices.id]
	}),
	creditNote: one(creditNotes, {
		fields: [creditNoteRedemptions.creditNoteId],
		references: [creditNotes.id]
	}),
	payment: one(payments, {
		fields: [creditNoteRedemptions.paymentId],
		references: [payments.id]
	}),
}));

export const creditNotesRelations = relations(creditNotes, ({one, many}) => ({
	creditNoteRedemptions: many(creditNoteRedemptions),
	user: one(users, {
		fields: [creditNotes.issuedByUserId],
		references: [users.id]
	}),
	member: one(members, {
		fields: [creditNotes.memberId],
		references: [members.id]
	}),
	memberMembership: one(memberMemberships, {
		fields: [creditNotes.originalMembershipId],
		references: [memberMemberships.id]
	}),
	payment: one(payments, {
		fields: [creditNotes.originalPaymentId],
		references: [payments.id]
	}),
}));

export const memberMembershipsRelations = relations(memberMemberships, ({one, many}) => ({
	creditNotes: many(creditNotes),
	member: one(members, {
		fields: [memberMemberships.memberId],
		references: [members.id]
	}),
	membershipPlan: one(membershipPlans, {
		fields: [memberMemberships.membershipPlanId],
		references: [membershipPlans.id]
	}),
	customerInvoiceLines: many(customerInvoiceLines),
}));

export const customerInvoicesRelations = relations(customerInvoices, ({one, many}) => ({
	member: one(members, {
		fields: [customerInvoices.memberId],
		references: [members.id]
	}),
	mpesaStkRequests: many(mpesaStkRequests),
	paymentApplications: many(paymentApplications),
	customerInvoiceLines: many(customerInvoiceLines),
}));

export const employeeGymAccessLogsRelations = relations(employeeGymAccessLogs, ({one}) => ({
	employee: one(employees, {
		fields: [employeeGymAccessLogs.employeeId],
		references: [employees.id]
	}),
}));

export const employeeLeaveBalancesRelations = relations(employeeLeaveBalances, ({one}) => ({
	employee: one(employees, {
		fields: [employeeLeaveBalances.employeeId],
		references: [employees.id]
	}),
}));

export const employeeLoansRelations = relations(employeeLoans, ({one, many}) => ({
	user_approvedBy: one(users, {
		fields: [employeeLoans.approvedBy],
		references: [users.id],
		relationName: "employeeLoans_approvedBy_users_id"
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [employeeLoans.disbursementAccountId],
		references: [ledgerAccounts.id]
	}),
	journalEntry_disbursementJournalEntryId: one(journalEntries, {
		fields: [employeeLoans.disbursementJournalEntryId],
		references: [journalEntries.id],
		relationName: "employeeLoans_disbursementJournalEntryId_journalEntries_id"
	}),
	employee: one(employees, {
		fields: [employeeLoans.employeeId],
		references: [employees.id]
	}),
	user_pausedBy: one(users, {
		fields: [employeeLoans.pausedBy],
		references: [users.id],
		relationName: "employeeLoans_pausedBy_users_id"
	}),
	user_rejectedBy: one(users, {
		fields: [employeeLoans.rejectedBy],
		references: [users.id],
		relationName: "employeeLoans_rejectedBy_users_id"
	}),
	user_resumedBy: one(users, {
		fields: [employeeLoans.resumedBy],
		references: [users.id],
		relationName: "employeeLoans_resumedBy_users_id"
	}),
	journalEntry_settlementJournalEntryId: one(journalEntries, {
		fields: [employeeLoans.settlementJournalEntryId],
		references: [journalEntries.id],
		relationName: "employeeLoans_settlementJournalEntryId_journalEntries_id"
	}),
	loanRepayments: many(loanRepayments),
	payrollDeductions: many(payrollDeductions),
}));

export const journalEntriesRelations = relations(journalEntries, ({many}) => ({
	employeeLoans_disbursementJournalEntryId: many(employeeLoans, {
		relationName: "employeeLoans_disbursementJournalEntryId_journalEntries_id"
	}),
	employeeLoans_settlementJournalEntryId: many(employeeLoans, {
		relationName: "employeeLoans_settlementJournalEntryId_journalEntries_id"
	}),
	journalLines: many(journalLines),
	loanRepayments: many(loanRepayments),
	payrollRemittanceLineItems: many(payrollRemittanceLineItems),
	payrollPeriods_disbursementJournalEntryId: many(payrollPeriods, {
		relationName: "payrollPeriods_disbursementJournalEntryId_journalEntries_id"
	}),
	payrollPeriods_payrollJournalEntryId: many(payrollPeriods, {
		relationName: "payrollPeriods_payrollJournalEntryId_journalEntries_id"
	}),
	payrollPeriods_remittanceJournalEntryId: many(payrollPeriods, {
		relationName: "payrollPeriods_remittanceJournalEntryId_journalEntries_id"
	}),
	salaryAdvanceRecoveries: many(salaryAdvanceRecoveries),
	salaryAdvances: many(salaryAdvances),
}));

export const complimentaryMembershipRequestsRelations = relations(complimentaryMembershipRequests, ({one}) => ({
	member: one(members, {
		fields: [complimentaryMembershipRequests.memberId],
		references: [members.id]
	}),
	membershipPlan: one(membershipPlans, {
		fields: [complimentaryMembershipRequests.planId],
		references: [membershipPlans.id]
	}),
	user_requestedByUserId: one(users, {
		fields: [complimentaryMembershipRequests.requestedByUserId],
		references: [users.id],
		relationName: "complimentaryMembershipRequests_requestedByUserId_users_id"
	}),
	payment: one(payments, {
		fields: [complimentaryMembershipRequests.resultingPaymentId],
		references: [payments.id]
	}),
	user_reviewedByUserId: one(users, {
		fields: [complimentaryMembershipRequests.reviewedByUserId],
		references: [users.id],
		relationName: "complimentaryMembershipRequests_reviewedByUserId_users_id"
	}),
}));

export const membershipPlansRelations = relations(membershipPlans, ({one, many}) => ({
	complimentaryMembershipRequests: many(complimentaryMembershipRequests),
	membershipUpgrades_newPlanId: many(membershipUpgrades, {
		relationName: "membershipUpgrades_newPlanId_membershipPlans_id"
	}),
	membershipUpgrades_originalPlanId: many(membershipUpgrades, {
		relationName: "membershipUpgrades_originalPlanId_membershipPlans_id"
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [membershipPlans.revenueAccountId],
		references: [ledgerAccounts.id]
	}),
	memberMemberships: many(memberMemberships),
	payments: many(payments),
	customerInvoiceLines: many(customerInvoiceLines),
}));

export const expenseDetailsRelations = relations(expenseDetails, ({one}) => ({
	ledgerAccount: one(ledgerAccounts, {
		fields: [expenseDetails.accountId],
		references: [ledgerAccounts.id]
	}),
	expenseHeader: one(expenseHeaders, {
		fields: [expenseDetails.expenseHeaderId],
		references: [expenseHeaders.id]
	}),
}));

export const expenseHeadersRelations = relations(expenseHeaders, ({one, many}) => ({
	expenseDetails: many(expenseDetails),
	bankAccount: one(bankAccounts, {
		fields: [expenseHeaders.bankId],
		references: [bankAccounts.id]
	}),
	user: one(users, {
		fields: [expenseHeaders.createdByUserId],
		references: [users.id]
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [expenseHeaders.creditingAccountId],
		references: [ledgerAccounts.id]
	}),
	payee: one(payees, {
		fields: [expenseHeaders.payeeId],
		references: [payees.id]
	}),
	expenseAttachments: many(expenseAttachments),
}));

export const journalLinesRelations = relations(journalLines, ({one}) => ({
	ledgerAccount: one(ledgerAccounts, {
		fields: [journalLines.accountId],
		references: [ledgerAccounts.id]
	}),
	journalEntry: one(journalEntries, {
		fields: [journalLines.journalEntryId],
		references: [journalEntries.id]
	}),
}));

export const leaveBalanceAdjustmentsRelations = relations(leaveBalanceAdjustments, ({one}) => ({
	employee: one(employees, {
		fields: [leaveBalanceAdjustments.employeeId],
		references: [employees.id]
	}),
	user: one(users, {
		fields: [leaveBalanceAdjustments.performedBy],
		references: [users.id]
	}),
}));

export const payeesRelations = relations(payees, ({many}) => ({
	expenseHeaders: many(expenseHeaders),
}));

export const ledgerAccountMappingsRelations = relations(ledgerAccountMappings, ({one}) => ({
	ledgerAccount: one(ledgerAccounts, {
		fields: [ledgerAccountMappings.accountId],
		references: [ledgerAccounts.id]
	}),
}));

export const leaveRequestsRelations = relations(leaveRequests, ({one}) => ({
	user_approvedBy: one(users, {
		fields: [leaveRequests.approvedBy],
		references: [users.id],
		relationName: "leaveRequests_approvedBy_users_id"
	}),
	user_cancelledBy: one(users, {
		fields: [leaveRequests.cancelledBy],
		references: [users.id],
		relationName: "leaveRequests_cancelledBy_users_id"
	}),
	employee: one(employees, {
		fields: [leaveRequests.employeeId],
		references: [employees.id]
	}),
	user_requestedBy: one(users, {
		fields: [leaveRequests.requestedBy],
		references: [users.id],
		relationName: "leaveRequests_requestedBy_users_id"
	}),
}));

export const memberAccessProfilesRelations = relations(memberAccessProfiles, ({one}) => ({
	member: one(members, {
		fields: [memberAccessProfiles.memberId],
		references: [members.id]
	}),
}));

export const memberRegistrationLinksRelations = relations(memberRegistrationLinks, ({one}) => ({
	member: one(members, {
		fields: [memberRegistrationLinks.memberId],
		references: [members.id]
	}),
}));

export const membershipUpgradesRelations = relations(membershipUpgrades, ({one}) => ({
	user: one(users, {
		fields: [membershipUpgrades.createdByUserId],
		references: [users.id]
	}),
	member: one(members, {
		fields: [membershipUpgrades.memberId],
		references: [members.id]
	}),
	membershipPlan_newPlanId: one(membershipPlans, {
		fields: [membershipUpgrades.newPlanId],
		references: [membershipPlans.id],
		relationName: "membershipUpgrades_newPlanId_membershipPlans_id"
	}),
	payment_originalPaymentId: one(payments, {
		fields: [membershipUpgrades.originalPaymentId],
		references: [payments.id],
		relationName: "membershipUpgrades_originalPaymentId_payments_id"
	}),
	membershipPlan_originalPlanId: one(membershipPlans, {
		fields: [membershipUpgrades.originalPlanId],
		references: [membershipPlans.id],
		relationName: "membershipUpgrades_originalPlanId_membershipPlans_id"
	}),
	payment_upgradePaymentId: one(payments, {
		fields: [membershipUpgrades.upgradePaymentId],
		references: [payments.id],
		relationName: "membershipUpgrades_upgradePaymentId_payments_id"
	}),
}));

export const mpesaStkRequestsRelations = relations(mpesaStkRequests, ({one}) => ({
	customerInvoice: one(customerInvoices, {
		fields: [mpesaStkRequests.invoiceId],
		references: [customerInvoices.id]
	}),
	member: one(members, {
		fields: [mpesaStkRequests.memberId],
		references: [members.id]
	}),
	payment: one(payments, {
		fields: [mpesaStkRequests.paymentId],
		references: [payments.id]
	}),
}));

export const overtimeRecordsRelations = relations(overtimeRecords, ({one, many}) => ({
	user_approvedBy: one(users, {
		fields: [overtimeRecords.approvedBy],
		references: [users.id],
		relationName: "overtimeRecords_approvedBy_users_id"
	}),
	user_createdBy: one(users, {
		fields: [overtimeRecords.createdBy],
		references: [users.id],
		relationName: "overtimeRecords_createdBy_users_id"
	}),
	employee: one(employees, {
		fields: [overtimeRecords.employeeId],
		references: [employees.id]
	}),
	payrollPeriod: one(payrollPeriods, {
		fields: [overtimeRecords.payrollPeriodId],
		references: [payrollPeriods.id]
	}),
	payrollSlips: many(payrollSlips),
}));

export const payrollPeriodsRelations = relations(payrollPeriods, ({one, many}) => ({
	overtimeRecords: many(overtimeRecords),
	payrollSlips: many(payrollSlips),
	payrollDeductions: many(payrollDeductions),
	payrollPeriodBonuses: many(payrollPeriodBonuses),
	payrollPeriodOtherDeductions: many(payrollPeriodOtherDeductions),
	payrollRemittanceLineItems: many(payrollRemittanceLineItems),
	user_approvedBy: one(users, {
		fields: [payrollPeriods.approvedBy],
		references: [users.id],
		relationName: "payrollPeriods_approvedBy_users_id"
	}),
	user_cancelledBy: one(users, {
		fields: [payrollPeriods.cancelledBy],
		references: [users.id],
		relationName: "payrollPeriods_cancelledBy_users_id"
	}),
	user_createdBy: one(users, {
		fields: [payrollPeriods.createdBy],
		references: [users.id],
		relationName: "payrollPeriods_createdBy_users_id"
	}),
	journalEntry_disbursementJournalEntryId: one(journalEntries, {
		fields: [payrollPeriods.disbursementJournalEntryId],
		references: [journalEntries.id],
		relationName: "payrollPeriods_disbursementJournalEntryId_journalEntries_id"
	}),
	journalEntry_payrollJournalEntryId: one(journalEntries, {
		fields: [payrollPeriods.payrollJournalEntryId],
		references: [journalEntries.id],
		relationName: "payrollPeriods_payrollJournalEntryId_journalEntries_id"
	}),
	journalEntry_remittanceJournalEntryId: one(journalEntries, {
		fields: [payrollPeriods.remittanceJournalEntryId],
		references: [journalEntries.id],
		relationName: "payrollPeriods_remittanceJournalEntryId_journalEntries_id"
	}),
}));

export const paymentApplicationsRelations = relations(paymentApplications, ({one}) => ({
	customerInvoice: one(customerInvoices, {
		fields: [paymentApplications.invoiceId],
		references: [customerInvoices.id]
	}),
	payment: one(payments, {
		fields: [paymentApplications.paymentId],
		references: [payments.id]
	}),
}));

export const passwordResetAttemptsRelations = relations(passwordResetAttempts, ({one}) => ({
	user: one(users, {
		fields: [passwordResetAttempts.userId],
		references: [users.id]
	}),
}));

export const passwordResetChallengesRelations = relations(passwordResetChallenges, ({one}) => ({
	user: one(users, {
		fields: [passwordResetChallenges.userId],
		references: [users.id]
	}),
}));

export const loanRepaymentsRelations = relations(loanRepayments, ({one}) => ({
	employee: one(employees, {
		fields: [loanRepayments.employeeId],
		references: [employees.id]
	}),
	journalEntry: one(journalEntries, {
		fields: [loanRepayments.journalEntryId],
		references: [journalEntries.id]
	}),
	employeeLoan: one(employeeLoans, {
		fields: [loanRepayments.loanId],
		references: [employeeLoans.id]
	}),
	payrollSlip: one(payrollSlips, {
		fields: [loanRepayments.payrollSlipId],
		references: [payrollSlips.id]
	}),
}));

export const payrollSlipsRelations = relations(payrollSlips, ({one, many}) => ({
	loanRepayments: many(loanRepayments),
	user_approvedBy: one(users, {
		fields: [payrollSlips.approvedBy],
		references: [users.id],
		relationName: "payrollSlips_approvedBy_users_id"
	}),
	user_cancelledBy: one(users, {
		fields: [payrollSlips.cancelledBy],
		references: [users.id],
		relationName: "payrollSlips_cancelledBy_users_id"
	}),
	employee: one(employees, {
		fields: [payrollSlips.employeeId],
		references: [employees.id]
	}),
	overtimeRecord: one(overtimeRecords, {
		fields: [payrollSlips.overtimeRecordId],
		references: [overtimeRecords.id]
	}),
	payrollPeriod: one(payrollPeriods, {
		fields: [payrollSlips.payrollPeriodId],
		references: [payrollPeriods.id]
	}),
	salaryStructure: one(salaryStructures, {
		fields: [payrollSlips.salaryStructureId],
		references: [salaryStructures.id]
	}),
	payrollDeductions: many(payrollDeductions),
	salaryAdvanceRecoveries: many(salaryAdvanceRecoveries),
}));

export const loginAttemptsRelations = relations(loginAttempts, ({one}) => ({
	user: one(users, {
		fields: [loginAttempts.userId],
		references: [users.id]
	}),
}));

export const payrollAccountMappingsRelations = relations(payrollAccountMappings, ({one}) => ({
	ledgerAccount: one(ledgerAccounts, {
		fields: [payrollAccountMappings.accountId],
		references: [ledgerAccounts.id]
	}),
}));

export const salaryStructuresRelations = relations(salaryStructures, ({one, many}) => ({
	payrollSlips: many(payrollSlips),
	user: one(users, {
		fields: [salaryStructures.createdBy],
		references: [users.id]
	}),
	employee: one(employees, {
		fields: [salaryStructures.employeeId],
		references: [employees.id]
	}),
}));

export const payrollDeductionsRelations = relations(payrollDeductions, ({one}) => ({
	salaryAdvance: one(salaryAdvances, {
		fields: [payrollDeductions.advanceId],
		references: [salaryAdvances.id]
	}),
	employee: one(employees, {
		fields: [payrollDeductions.employeeId],
		references: [employees.id]
	}),
	employeeLoan: one(employeeLoans, {
		fields: [payrollDeductions.loanId],
		references: [employeeLoans.id]
	}),
	payrollPeriod: one(payrollPeriods, {
		fields: [payrollDeductions.payrollPeriodId],
		references: [payrollPeriods.id]
	}),
	payrollSlip: one(payrollSlips, {
		fields: [payrollDeductions.payrollSlipId],
		references: [payrollSlips.id]
	}),
}));

export const salaryAdvancesRelations = relations(salaryAdvances, ({one, many}) => ({
	payrollDeductions: many(payrollDeductions),
	salaryAdvanceRecoveries: many(salaryAdvanceRecoveries),
	user_approvedBy: one(users, {
		fields: [salaryAdvances.approvedBy],
		references: [users.id],
		relationName: "salaryAdvances_approvedBy_users_id"
	}),
	user_cancelledBy: one(users, {
		fields: [salaryAdvances.cancelledBy],
		references: [users.id],
		relationName: "salaryAdvances_cancelledBy_users_id"
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [salaryAdvances.disbursementAccountId],
		references: [ledgerAccounts.id]
	}),
	journalEntry: one(journalEntries, {
		fields: [salaryAdvances.disbursementJournalEntryId],
		references: [journalEntries.id]
	}),
	employee: one(employees, {
		fields: [salaryAdvances.employeeId],
		references: [employees.id]
	}),
	user_rejectedBy: one(users, {
		fields: [salaryAdvances.rejectedBy],
		references: [users.id],
		relationName: "salaryAdvances_rejectedBy_users_id"
	}),
}));

export const payrollPeriodBonusesRelations = relations(payrollPeriodBonuses, ({one}) => ({
	user: one(users, {
		fields: [payrollPeriodBonuses.createdBy],
		references: [users.id]
	}),
	employee: one(employees, {
		fields: [payrollPeriodBonuses.employeeId],
		references: [employees.id]
	}),
	payrollPeriod: one(payrollPeriods, {
		fields: [payrollPeriodBonuses.payrollPeriodId],
		references: [payrollPeriods.id]
	}),
}));

export const payrollPeriodOtherDeductionsRelations = relations(payrollPeriodOtherDeductions, ({one}) => ({
	user: one(users, {
		fields: [payrollPeriodOtherDeductions.createdBy],
		references: [users.id]
	}),
	employee: one(employees, {
		fields: [payrollPeriodOtherDeductions.employeeId],
		references: [employees.id]
	}),
	payrollPeriod: one(payrollPeriods, {
		fields: [payrollPeriodOtherDeductions.payrollPeriodId],
		references: [payrollPeriods.id]
	}),
}));

export const payrollRemittanceLineItemsRelations = relations(payrollRemittanceLineItems, ({one}) => ({
	journalEntry: one(journalEntries, {
		fields: [payrollRemittanceLineItems.journalEntryId],
		references: [journalEntries.id]
	}),
	payrollPeriod: one(payrollPeriods, {
		fields: [payrollRemittanceLineItems.payrollPeriodId],
		references: [payrollPeriods.id]
	}),
}));

export const paymentMembersRelations = relations(paymentMembers, ({one}) => ({
	member: one(members, {
		fields: [paymentMembers.memberId],
		references: [members.id]
	}),
	payment: one(payments, {
		fields: [paymentMembers.paymentId],
		references: [payments.id]
	}),
}));

export const salaryAdvanceRecoveriesRelations = relations(salaryAdvanceRecoveries, ({one}) => ({
	salaryAdvance: one(salaryAdvances, {
		fields: [salaryAdvanceRecoveries.advanceId],
		references: [salaryAdvances.id]
	}),
	journalEntry: one(journalEntries, {
		fields: [salaryAdvanceRecoveries.clearingJournalEntryId],
		references: [journalEntries.id]
	}),
	employee: one(employees, {
		fields: [salaryAdvanceRecoveries.employeeId],
		references: [employees.id]
	}),
	payrollSlip: one(payrollSlips, {
		fields: [salaryAdvanceRecoveries.payrollSlipId],
		references: [payrollSlips.id]
	}),
}));

export const recurringBillsSchedulesRelations = relations(recurringBillsSchedules, ({one}) => ({
	bill: one(bills, {
		fields: [recurringBillsSchedules.billId],
		references: [bills.id]
	}),
	vendor: one(vendors, {
		fields: [recurringBillsSchedules.vendorId],
		references: [vendors.id]
	}),
}));

export const settingsRelations = relations(settings, ({one}) => ({
	user_createdBy: one(users, {
		fields: [settings.createdBy],
		references: [users.id],
		relationName: "settings_createdBy_users_id"
	}),
	user_updatedBy: one(users, {
		fields: [settings.updatedBy],
		references: [users.id],
		relationName: "settings_updatedBy_users_id"
	}),
}));

export const smsLogsRelations = relations(smsLogs, ({one}) => ({
	smsTemplate: one(smsTemplates, {
		fields: [smsLogs.templateId],
		references: [smsTemplates.id]
	}),
}));

export const smsTemplatesRelations = relations(smsTemplates, ({many}) => ({
	smsLogs: many(smsLogs),
	smsBroadcasts: many(smsBroadcasts),
}));

export const statutoryRatesRelations = relations(statutoryRates, ({one}) => ({
	user: one(users, {
		fields: [statutoryRates.createdBy],
		references: [users.id]
	}),
}));

export const whtCorrectionLinesRelations = relations(whtCorrectionLines, ({one}) => ({
	bill: one(bills, {
		fields: [whtCorrectionLines.billId],
		references: [bills.id]
	}),
	whtCorrection: one(whtCorrections, {
		fields: [whtCorrectionLines.correctionId],
		references: [whtCorrections.id]
	}),
}));

export const whtCorrectionsRelations = relations(whtCorrections, ({one, many}) => ({
	whtCorrectionLines: many(whtCorrectionLines),
	bankAccount: one(bankAccounts, {
		fields: [whtCorrections.bankId],
		references: [bankAccounts.id]
	}),
	user: one(users, {
		fields: [whtCorrections.createdBy],
		references: [users.id]
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [whtCorrections.creditingAccountId],
		references: [ledgerAccounts.id]
	}),
}));

export const whtRemittancesRelations = relations(whtRemittances, ({one, many}) => ({
	bankAccount: one(bankAccounts, {
		fields: [whtRemittances.bankId],
		references: [bankAccounts.id]
	}),
	user: one(users, {
		fields: [whtRemittances.createdBy],
		references: [users.id]
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [whtRemittances.creditingAccountId],
		references: [ledgerAccounts.id]
	}),
	whtRemittanceLines: many(whtRemittanceLines),
}));

export const whtRemittanceLinesRelations = relations(whtRemittanceLines, ({one}) => ({
	bill: one(bills, {
		fields: [whtRemittanceLines.billId],
		references: [bills.id]
	}),
	whtRemittance: one(whtRemittances, {
		fields: [whtRemittanceLines.remittanceId],
		references: [whtRemittances.id]
	}),
}));

export const accessControlSyncAttemptsRelations = relations(accessControlSyncAttempts, ({one}) => ({
	accessControlSyncJob: one(accessControlSyncJobs, {
		fields: [accessControlSyncAttempts.jobId],
		references: [accessControlSyncJobs.id]
	}),
}));

export const departmentsRelations = relations(departments, ({many}) => ({
	employees: many(employees),
}));

export const billItemsRelations = relations(billItems, ({one}) => ({
	bill: one(bills, {
		fields: [billItems.billId],
		references: [bills.id]
	}),
	ledgerAccount: one(ledgerAccounts, {
		fields: [billItems.expenseAccountId],
		references: [ledgerAccounts.id]
	}),
}));

export const customerInvoiceLinesRelations = relations(customerInvoiceLines, ({one}) => ({
	customerInvoice: one(customerInvoices, {
		fields: [customerInvoiceLines.invoiceId],
		references: [customerInvoices.id]
	}),
	memberMembership: one(memberMemberships, {
		fields: [customerInvoiceLines.membershipId],
		references: [memberMemberships.id]
	}),
	membershipPlan: one(membershipPlans, {
		fields: [customerInvoiceLines.planId],
		references: [membershipPlans.id]
	}),
	ledgerAccount_revenueAccountId: one(ledgerAccounts, {
		fields: [customerInvoiceLines.revenueAccountId],
		references: [ledgerAccounts.id],
		relationName: "customerInvoiceLines_revenueAccountId_ledgerAccounts_id"
	}),
	ledgerAccount_taxAccountId: one(ledgerAccounts, {
		fields: [customerInvoiceLines.taxAccountId],
		references: [ledgerAccounts.id],
		relationName: "customerInvoiceLines_taxAccountId_ledgerAccounts_id"
	}),
}));

export const expenseAttachmentsRelations = relations(expenseAttachments, ({one}) => ({
	expenseHeader: one(expenseHeaders, {
		fields: [expenseAttachments.expenseHeaderId],
		references: [expenseHeaders.id]
	}),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const smsBroadcastsRelations = relations(smsBroadcasts, ({one}) => ({
	smsTemplate: one(smsTemplates, {
		fields: [smsBroadcasts.smsTemplateId],
		references: [smsTemplates.id]
	}),
}));

export const twoFactorsRelations = relations(twoFactors, ({one}) => ({
	user: one(users, {
		fields: [twoFactors.userId],
		references: [users.id]
	}),
}));