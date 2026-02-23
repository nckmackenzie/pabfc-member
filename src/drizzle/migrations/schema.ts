import { pgTable, index, foreignKey, varchar, date, boolean, timestamp, numeric, bigserial, text, unique, integer, serial, inet, jsonb, uniqueIndex, bigint, json, primaryKey, pgView, interval, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const accountType = pgEnum("account_type", ['asset', 'liability', 'equity', 'revenue', 'expense'])
export const billStatus = pgEnum("bill_status", ['draft', 'pending', 'approved', 'paid', 'overdue', 'cancelled', 'partially-paid'])
export const discountType = pgEnum("discount_type", ['none', 'amount', 'percentage'])
export const expensePaymentMethod = pgEnum("expense_payment_method", ['cash', 'cheque', 'mpesa', 'bank'])
export const gender = pgEnum("gender", ['male', 'female', 'unspecified', 'other'])
export const invoiceStatus = pgEnum("invoice_status", ['draft', 'open', 'partially_paid', 'paid', 'cancelled', 'overdue'])
export const lineDc = pgEnum("line_dc", ['debit', 'credit'])
export const memberStatus = pgEnum("member_status", ['active', 'inactive', 'frozen', 'terminated'])
export const membershipStatus = pgEnum("membership_status", ['active', 'inactive', 'frozen', 'terminated', 'expired', 'pending', 'cancelled', 'suspended', ''])
export const mpesaStkStatus = pgEnum("mpesa_stk_status", ['pending', 'success', 'failed', 'timeout', 'cancelled'])
export const normalBalance = pgEnum("normal_balance", ['debit', 'credit'])
export const paymentChannel = pgEnum("payment_channel", ['portal', 'staff', 'auto_renewal'])
export const paymentMethod = pgEnum("payment_method", ['mpesa_stk', 'mpesa_manual', 'cash', 'card', 'bank_transfer'])
export const paymentStatus = pgEnum("payment_status", ['pending', 'completed', 'failed', 'cancelled', 'refunded'])
export const recurrencyPeriod = pgEnum("recurrency_period", ['daily', 'weekly', 'monthly', 'quarterly', 'biannually', 'yearly'])
export const smsBroadcastStatus = pgEnum("sms_broadcast_status", ['draft', 'sent', 'sending', 'failed'])
export const smsFilterCriteria = pgEnum("sms_filter_criteria", ['by status', 'by plan', 'all members', 'specific members'])
export const userType = pgEnum("user_type", ['admin', 'staff', 'member'])
export const vatType = pgEnum("vat_type", ['none', 'inclusive', 'exclusive'])


export const memberMemberships = pgTable("member_memberships", {
	id: varchar().primaryKey().notNull(),
	memberId: varchar("member_id").notNull(),
	membershipPlanId: varchar("membership_plan_id").notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date"),
	status: membershipStatus().default('active').notNull(),
	autoRenew: boolean("auto_renew").default(false).notNull(),
	freezeStartDate: date("freeze_start_date"),
	freezeEndDate: date("freeze_end_date"),
	freezeReason: varchar("freeze_reason", { length: 255 }),
	terminatedAt: date("terminated_at"),
	terminatedReason: varchar("terminated_reason", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	priceCharged: numeric("price_charged", { precision: 10, scale:  2 }),
	invoiceId: varchar("invoice_id", { length: 255 }),
	paymentId: varchar("payment_id", { length: 255 }),
	previousMembershipPlanId: varchar("previous_membership_plan_id", { length: 255 }),
}, (table) => [
	index("idx_member_membership_member_id").using("btree", table.memberId.asc().nullsLast().op("text_ops")),
	index("idx_member_membership_membership_plan_id").using("btree", table.membershipPlanId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "member_memberships_member_id_members_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.membershipPlanId],
			foreignColumns: [membershipPlans.id],
			name: "member_memberships_membership_plan_id_membership_plans_id_fk"
		}).onDelete("restrict"),
]);

export const attendanceLogs = pgTable("attendance_logs", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	memberId: varchar("member_id").notNull(),
	checkInTime: timestamp("check_in_time", { withTimezone: true, mode: 'string' }).notNull(),
	checkOutTime: timestamp("check_out_time", { withTimezone: true, mode: 'string' }),
	source: varchar({ length: 30 }),
	deviceId: varchar("device_id", { length: 100 }),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "attendance_logs_member_id_members_id_fk"
		}),
]);

export const members = pgTable("members", {
	id: varchar().primaryKey().notNull(),
	memberNo: integer("member_no").default(0).notNull(),
	firstName: varchar("first_name").notNull(),
	lastName: varchar("last_name").notNull(),
	dateOfBirth: date("date_of_birth"),
	gender: gender().default('unspecified').notNull(),
	email: varchar(),
	contact: varchar({ length: 15 }),
	idType: varchar("id_type", { length: 20 }),
	idNumber: varchar("id_number", { length: 20 }),
	memberStatus: memberStatus("member_status").default('active').notNull(),
	address: varchar({ length: 255 }),
	city: varchar({ length: 100 }),
	state: varchar({ length: 100 }),
	zipCode: varchar("zip_code", { length: 20 }),
	country: varchar({ length: 100 }),
	emergencyContactName: varchar("emergency_contact_name", { length: 100 }),
	emergencyContactNo: varchar("emergency_contact_no", { length: 15 }),
	emergencyContactRelationship: varchar("emergency_contact_relationship", { length: 100 }),
	deviceId: varchar("device_id", { length: 255 }),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	image: varchar({ length: 255 }),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	deactivatedAt: timestamp("deactivated_at", { mode: 'string' }),
	completedRegistration: boolean("completed_registration").default(false).notNull(),
}, (table) => [
	index("idx_member_first_name").using("btree", table.firstName.asc().nullsLast().op("text_ops")),
	index("idx_member_last_name").using("btree", table.lastName.asc().nullsLast().op("text_ops")),
	index("idx_member_status").using("btree", table.memberStatus.asc().nullsLast().op("enum_ops")),
	unique("members_member_no_unique").on(table.memberNo),
	unique("members_email_unique").on(table.email),
	unique("members_contact_unique").on(table.contact),
	unique("members_id_number_unique").on(table.idNumber),
]);

export const membershipPlans = pgTable("membership_plans", {
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	description: text(),
	duration: integer().notNull(),
	isSessionBased: boolean("is_session_based").default(false).notNull(),
	sessionCount: integer("session_count").default(0).notNull(),
	active: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	price: integer().default(0).notNull(),
	validFrom: date("valid_from"),
	validTo: date("valid_to"),
	revenueAccountId: integer("revenue_account_id"),
}, (table) => [
	index("idx_membership_plan_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.revenueAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "membership_plans_revenue_account_id_ledger_accounts_id_fk"
		}),
]);

export const sessions = pgTable("sessions", {
	id: varchar().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
	impersonatedBy: text("impersonated_by"),
}, (table) => [
	index("sessions_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("sessions_token_unique").on(table.token),
]);

export const twoFactors = pgTable("two_factors", {
	id: varchar().primaryKey().notNull(),
	secret: text().notNull(),
	backupCodes: text("backup_codes").notNull(),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "two_factors_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: varchar().primaryKey().notNull(),
	name: text().notNull(),
	email: text(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	twoFactorEnabled: boolean("two_factor_enabled").default(false),
	role: userType().default('staff').notNull(),
	banned: boolean().default(false),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires", { mode: 'string' }),
	username: text(),
	displayUsername: text("display_username"),
	contact: text().notNull(),
	active: boolean().default(true).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	memberId: varchar("member_id", { length: 255 }),
	deactivatedAt: timestamp("deactivated_at", { mode: 'string' }),
}, (table) => [
	index("users_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
	index("users_name_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	unique("users_username_unique").on(table.username),
	unique("users_member_id_unique").on(table.memberId),
]);

export const verifications = pgTable("verifications", {
	id: varchar().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("verifications_identifier_idx").using("btree", table.identifier.asc().nullsLast().op("text_ops")),
]);

export const accounts = pgTable("accounts", {
	id: varchar().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	index("accounts_userId_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const journalLines = pgTable("journal_lines", {
	id: serial().primaryKey().notNull(),
	journalEntryId: integer("journal_entry_id").notNull(),
	accountId: integer("account_id").notNull(),
	dc: lineDc().notNull(),
	amount: numeric({ precision: 18, scale:  2 }).notNull(),
	memo: text(),
	lineNumber: integer("line_number").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.journalEntryId],
			foreignColumns: [journalEntries.id],
			name: "journal_lines_journal_entry_id_journal_entries_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [ledgerAccounts.id],
			name: "journal_lines_account_id_ledger_accounts_id_fk"
		}),
]);

export const ledgerAccounts = pgTable("ledger_accounts", {
	id: serial().primaryKey().notNull(),
	code: varchar({ length: 20 }),
	name: varchar({ length: 255 }).notNull(),
	type: accountType().notNull(),
	normalBalance: normalBalance("normal_balance").notNull(),
	parentId: integer("parent_id"),
	isPosting: boolean("is_posting").default(true).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_accounts_code").using("btree", table.code.asc().nullsLast().op("text_ops")),
	index("idx_accounts_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
	unique("ledger_accounts_code_unique").on(table.code),
]);

export const customerInvoices = pgTable("customer_invoices", {
	id: varchar().primaryKey().notNull(),
	invoiceNo: varchar("invoice_no", { length: 50 }).notNull(),
	memberId: varchar("member_id").notNull(),
	issueDate: date("issue_date").notNull(),
	dueDate: date("due_date").notNull(),
	status: invoiceStatus().default('open').notNull(),
	currency: varchar({ length: 10 }).default('KES').notNull(),
	subtotalAmount: numeric("subtotal_amount", { precision: 18, scale:  2 }).notNull(),
	taxAmount: numeric("tax_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	totalAmount: numeric("total_amount", { precision: 18, scale:  2 }).notNull(),
	balanceAmount: numeric("balance_amount", { precision: 18, scale:  2 }).notNull(),
	source: varchar({ length: 50 }),
	sourceId: varchar("source_id"),
	channel: paymentChannel(),
	createdByUserId: varchar("created_by_user_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "customer_invoices_member_id_members_id_fk"
		}),
	unique("customer_invoices_invoice_no_unique").on(table.invoiceNo),
]);

export const permissions = pgTable("permissions", {
	id: varchar().primaryKey().notNull(),
	resource: varchar({ length: 64 }).notNull(),
	action: varchar({ length: 64 }).notNull(),
	key: varchar({ length: 128 }).notNull(),
	description: varchar().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	unique("permissions_key_unique").on(table.key),
]);

export const forms = pgTable("forms", {
	id: serial().primaryKey().notNull(),
	name: varchar().notNull(),
	module: varchar().notNull(),
	moduleId: integer("module_id").notNull(),
	path: varchar().notNull(),
	menuOrder: integer("menu_order").notNull(),
	resource: varchar().notNull(),
	active: boolean().default(true).notNull(),
});

export const roles = pgTable("roles", {
	id: varchar().primaryKey().notNull(),
	name: varchar({ length: 128 }).notNull(),
	description: varchar({ length: 512 }),
	isSystem: boolean("is_system").default(false).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const loginAttempts = pgTable("login_attempts", {
	id: varchar().primaryKey().notNull(),
	userId: text("user_id"),
	ipAddress: inet("ip_address").notNull(),
	userAgent: text("user_agent"),
	success: boolean().notNull(),
	attemptedAt: timestamp("attempted_at", { mode: 'string' }).defaultNow(),
	failureReason: text("failure_reason"),
}, (table) => [
	index("login_attempts_attempted_at_idx").using("btree", table.attemptedAt.asc().nullsLast().op("timestamp_ops")),
	index("login_attempts_ip_address_idx").using("btree", table.ipAddress.asc().nullsLast().op("inet_ops")),
	index().using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "login_attempts_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const activityLogs = pgTable("activity_logs", {
	id: varchar().primaryKey().notNull(),
	userId: varchar("user_id").notNull(),
	action: varchar().notNull(),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: varchar("user_agent"),
	os: varchar({ length: 100 }),
	description: varchar().notNull(),
	activityDate: timestamp("activity_date", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("activity_logs_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "activity_logs_user_id_users_id_fk"
		}),
]);

export const settings = pgTable("settings", {
	id: varchar().primaryKey().notNull(),
	dataPrivacy: jsonb("data_privacy").default({"logRetentionDays":180}),
	notification: jsonb().default({}),
	security: jsonb().default({}),
	billing: jsonb().default({}),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdBy: text("created_by").notNull(),
	updatedBy: text("updated_by"),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "settings_created_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [users.id],
			name: "settings_updated_by_users_id_fk"
		}),
]);

export const journalEntries = pgTable("journal_entries", {
	id: serial().primaryKey().notNull(),
	entryDate: date("entry_date").notNull(),
	reference: varchar({ length: 50 }),
	description: text(),
	source: varchar({ length: 50 }),
	sourceId: varchar("source_id", { length: 50 }),
	journalNo: integer("journal_no"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const customerInvoiceLines = pgTable("customer_invoice_lines", {
	id: serial().primaryKey().notNull(),
	invoiceId: varchar("invoice_id").notNull(),
	lineNumber: integer("line_number").notNull(),
	description: text().notNull(),
	planId: varchar("plan_id"),
	membershipId: varchar("membership_id"),
	quantity: numeric({ precision: 18, scale:  2 }).default('1').notNull(),
	unitPrice: numeric("unit_price", { precision: 18, scale:  2 }).notNull(),
	lineSubtotal: numeric("line_subtotal", { precision: 18, scale:  2 }).notNull(),
	taxAmount: numeric("tax_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	lineTotal: numeric("line_total", { precision: 18, scale:  2 }).notNull(),
	revenueAccountId: integer("revenue_account_id").notNull(),
	taxAccountId: integer("tax_account_id"),
}, (table) => [
	foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [customerInvoices.id],
			name: "customer_invoice_lines_invoice_id_customer_invoices_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.planId],
			foreignColumns: [membershipPlans.id],
			name: "customer_invoice_lines_plan_id_membership_plans_id_fk"
		}),
	foreignKey({
			columns: [table.membershipId],
			foreignColumns: [memberMemberships.id],
			name: "customer_invoice_lines_membership_id_member_memberships_id_fk"
		}),
	foreignKey({
			columns: [table.revenueAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "customer_invoice_lines_revenue_account_id_ledger_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.taxAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "customer_invoice_lines_tax_account_id_ledger_accounts_id_fk"
		}),
]);

export const paymentApplications = pgTable("payment_applications", {
	id: serial().primaryKey().notNull(),
	paymentId: varchar("payment_id").notNull(),
	invoiceId: varchar("invoice_id").notNull(),
	amountApplied: numeric("amount_applied", { precision: 18, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "payment_applications_payment_id_payments_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [customerInvoices.id],
			name: "payment_applications_invoice_id_customer_invoices_id_fk"
		}).onDelete("cascade"),
]);

export const mpesaStkRequests = pgTable("mpesa_stk_requests", {
	id: serial().primaryKey().notNull(),
	memberId: varchar("member_id").notNull(),
	invoiceId: varchar("invoice_id"),
	paymentId: varchar("payment_id"),
	phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
	amount: numeric({ precision: 18, scale:  2 }).notNull(),
	status: mpesaStkStatus().default('pending').notNull(),
	merchantRequestId: varchar("merchant_request_id", { length: 100 }),
	checkoutRequestId: varchar("checkout_request_id", { length: 100 }),
	rawRequest: jsonb("raw_request"),
	rawResponse: jsonb("raw_response"),
	callbackPayload: jsonb("callback_payload"),
	errorCode: varchar("error_code", { length: 50 }),
	errorMessage: varchar("error_message", { length: 255 }),
	initiatedChannel: paymentChannel("initiated_channel").notNull(),
	initiatedByUserId: varchar("initiated_by_user_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	callbackReceivedAt: timestamp("callback_received_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "mpesa_stk_requests_member_id_members_id_fk"
		}),
	foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [customerInvoices.id],
			name: "mpesa_stk_requests_invoice_id_customer_invoices_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "mpesa_stk_requests_payment_id_payments_id_fk"
		}),
]);

export const payments = pgTable("payments", {
	id: varchar().primaryKey().notNull(),
	paymentDate: timestamp("payment_date", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	memberId: varchar("member_id").notNull(),
	amount: numeric({ precision: 18, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).default('KES').notNull(),
	status: paymentStatus().default('pending').notNull(),
	method: paymentMethod().notNull(),
	channel: paymentChannel().notNull(),
	reference: varchar({ length: 50 }),
	externalReference: varchar("external_reference", { length: 100 }),
	createdByUserId: varchar("created_by_user_id"),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	discountType: discountType("discount_type").default('none').notNull(),
	discount: numeric({ precision: 18, scale:  2 }),
	discountAmount: numeric("discount_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	taxAmount: numeric("tax_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	totalAmount: numeric("total_amount", { precision: 18, scale:  2 }).notNull(),
	paymentNo: varchar("payment_no", { length: 50 }).notNull(),
	planId: varchar("plan_id"),
	lineTotal: numeric("line_total", { precision: 18, scale:  2 }).notNull(),
	vatType: vatType("vat_type").default('none').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "payments_member_id_members_id_fk"
		}),
	foreignKey({
			columns: [table.planId],
			foreignColumns: [membershipPlans.id],
			name: "payments_plan_id_membership_plans_id_fk"
		}),
	unique("payments_payment_no_unique").on(table.paymentNo),
]);

export const expenseHeaders = pgTable("expense_headers", {
	id: varchar().primaryKey().notNull(),
	expenseDate: date("expense_date").notNull(),
	expenseNo: integer("expense_no").notNull(),
	payeeId: varchar("payee_id").notNull(),
	paymentMethod: expensePaymentMethod("payment_method").notNull(),
	reference: varchar({ length: 50 }),
	subTotal: numeric("sub_total", { precision: 18, scale:  2 }).notNull(),
	taxAmount: numeric("tax_amount", { precision: 18, scale:  2 }).notNull(),
	totalAmount: numeric("total_amount", { precision: 18, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).default('KES').notNull(),
	createdByUserId: varchar("created_by_user_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	bankId: varchar("bank_id"),
	creditingAccountId: integer("crediting_account_id"),
}, (table) => [
	index("expense_expense_date_idx").using("btree", table.expenseDate.asc().nullsLast().op("date_ops")),
	index("expenses_expense_no_idx").using("btree", table.expenseNo.asc().nullsLast().op("int4_ops")),
	index("expenses_reference_idx").using("btree", table.reference.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.payeeId],
			foreignColumns: [payees.id],
			name: "expense_headers_payee_id_payees_id_fk"
		}),
	foreignKey({
			columns: [table.createdByUserId],
			foreignColumns: [users.id],
			name: "expense_headers_created_by_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.bankId],
			foreignColumns: [bankAccounts.id],
			name: "expense_headers_bank_id_bank_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.creditingAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "expense_headers_crediting_account_id_ledger_accounts_id_fk"
		}),
]);

export const expenseDetails = pgTable("expense_details", {
	id: varchar().primaryKey().notNull(),
	expenseHeaderId: varchar("expense_header_id").notNull(),
	lineNumber: integer("line_number").notNull(),
	accountId: integer("account_id").notNull(),
	quantity: numeric({ precision: 18, scale:  2 }).default('1').notNull(),
	unitPrice: numeric("unit_price", { precision: 18, scale:  2 }).notNull(),
	lineSubtotal: numeric("line_subtotal", { precision: 18, scale:  2 }).notNull(),
	vatType: vatType("vat_type").default('none').notNull(),
	taxAmount: numeric("tax_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	lineTotal: numeric("line_total", { precision: 18, scale:  2 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.expenseHeaderId],
			foreignColumns: [expenseHeaders.id],
			name: "expense_details_expense_header_id_expense_headers_id_fk"
		}),
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [ledgerAccounts.id],
			name: "expense_details_account_id_ledger_accounts_id_fk"
		}),
]);

export const payees = pgTable("payees", {
	id: varchar().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	isActive: boolean("is_active").default(true).notNull(),
});

export const expenseAttachments = pgTable("expense_attachments", {
	id: serial().primaryKey().notNull(),
	expenseHeaderId: varchar("expense_header_id").notNull(),
	fileUrl: varchar("file_url").notNull(),
	fileName: varchar("file_name"),
	fileType: varchar("file_type"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.expenseHeaderId],
			foreignColumns: [expenseHeaders.id],
			name: "expense_attachments_expense_header_id_expense_headers_id_fk"
		}),
]);

export const smsLogs = pgTable("sms_logs", {
	id: varchar().primaryKey().notNull(),
	templateId: varchar("template_id"),
	message: text().notNull(),
	receipients: text().array().notNull(),
	sentAt: timestamp("sent_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.templateId],
			foreignColumns: [smsTemplates.id],
			name: "sms_logs_template_id_sms_templates_id_fk"
		}).onDelete("set null"),
]);

export const smsTemplates = pgTable("sms_templates", {
	id: varchar().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	variables: jsonb().default([]),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("name").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const smsBroadcasts = pgTable("sms_broadcasts", {
	id: varchar().primaryKey().notNull(),
	filterCriteria: smsFilterCriteria("filter_criteria").notNull(),
	criteria: varchar({ length: 255 }),
	smsTemplateId: varchar("sms_template_id"),
	message: text().notNull(),
	receipients: text().array().notNull(),
	smsBroadcastStatus: smsBroadcastStatus("sms_broadcast_status").default('draft').notNull(),
	sentAt: timestamp("sent_at", { mode: 'string' }),
	response: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.smsTemplateId],
			foreignColumns: [smsTemplates.id],
			name: "sms_broadcasts_sms_template_id_sms_templates_id_fk"
		}).onDelete("set null"),
]);

export const recurringBillsSchedules = pgTable("recurring_bills_schedules", {
	id: varchar().primaryKey().notNull(),
	vendorId: varchar("vendor_id").notNull(),
	billId: varchar("bill_id").notNull(),
	recurrencyPeriod: recurrencyPeriod("recurrency_period").notNull(),
	recurrencyEndDate: date("recurrency_end_date"),
	nextBillDate: date("next_bill_date"),
	lastGeneratedDate: date("last_generated_date"),
}, (table) => [
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.id],
			name: "recurring_bills_schedules_vendor_id_vendors_id_fk"
		}),
	foreignKey({
			columns: [table.billId],
			foreignColumns: [bills.id],
			name: "recurring_bills_schedules_bill_id_bills_id_fk"
		}),
]);

export const vendors = pgTable("vendors", {
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	email: varchar(),
	phone: varchar(),
	address: varchar(),
	taxPin: varchar("tax_pin"),
	active: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_vendors_email").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("idx_vendors_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
	index("idx_vendors_phone").using("btree", table.phone.asc().nullsLast().op("text_ops")),
	index("idx_vendors_tax_pin").using("btree", table.taxPin.asc().nullsLast().op("text_ops")),
	unique("vendors_tax_pin_unique").on(table.taxPin),
]);

export const billPayments = pgTable("bill_payments", {
	id: varchar().primaryKey().notNull(),
	paymentNo: integer("payment_no").notNull(),
	paymentDate: date("payment_date").notNull(),
	paymentMethod: varchar("payment_method").notNull(),
	reference: varchar(),
	memo: text(),
	createdBy: varchar("created_by").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	vendorId: varchar("vendor_id").notNull(),
	bankId: varchar("bank_id"),
	creditingAccountId: integer("crediting_account_id"),
}, (table) => [
	index("idx_bill_payments_payment_date").using("btree", table.paymentDate.asc().nullsLast().op("date_ops")),
	index("idx_bill_payments_payment_no").using("btree", table.paymentNo.asc().nullsLast().op("int4_ops")),
	index("idx_bill_payments_reference").using("btree", table.reference.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "bill_payments_created_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.id],
			name: "bill_payments_vendor_id_vendors_id_fk"
		}),
	foreignKey({
			columns: [table.bankId],
			foreignColumns: [bankAccounts.id],
			name: "bill_payments_bank_id_bank_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.creditingAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "bill_payments_crediting_account_id_ledger_accounts_id_fk"
		}),
]);

export const bills = pgTable("bills", {
	id: varchar().primaryKey().notNull(),
	vendorId: varchar("vendor_id").notNull(),
	invoiceNo: varchar("invoice_no").notNull(),
	invoiceDate: date("invoice_date").notNull(),
	dueDate: date("due_date"),
	subTotal: numeric("sub_total", { precision: 10, scale:  2 }).notNull(),
	tax: numeric({ precision: 10, scale:  2 }).notNull(),
	total: numeric({ precision: 10, scale:  2 }).notNull(),
	status: billStatus().default('draft').notNull(),
	isRecurring: boolean("is_recurring").default(false).notNull(),
	recurrencyPeriod: recurrencyPeriod("recurrency_period"),
	recurrencyEndDate: date("recurrency_end_date"),
	memo: text(),
	createdBy: varchar("created_by").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	terms: varchar(),
}, (table) => [
	index("idx_bills_due_date").using("btree", table.dueDate.asc().nullsLast().op("date_ops")),
	index("idx_bills_invoice_date").using("btree", table.invoiceDate.asc().nullsLast().op("date_ops")),
	index("idx_bills_invoice_no").using("btree", table.invoiceNo.asc().nullsLast().op("text_ops")),
	index("idx_bills_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("idx_bills_vendor_id").using("btree", table.vendorId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.id],
			name: "bills_vendor_id_vendors_id_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "bills_created_by_users_id_fk"
		}),
	unique("bills_invoice_no_unique").on(table.invoiceNo),
]);

export const billPaymentLines = pgTable("bill_payment_lines", {
	id: serial().primaryKey().notNull(),
	lineNumber: integer("line_number").notNull(),
	billPaymentId: varchar("bill_payment_id").notNull(),
	billId: varchar("bill_id").notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	dc: lineDc().notNull(),
	balance: numeric({ precision: 10, scale:  2 }).default('0').notNull(),
}, (table) => [
	index("idx_bill_payment_lines_bill_id").using("btree", table.billId.asc().nullsLast().op("text_ops")),
	index("idx_bill_payment_lines_bill_payment_id").using("btree", table.billPaymentId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.billId],
			foreignColumns: [bills.id],
			name: "bill_payment_lines_bill_id_bills_id_fk"
		}),
	foreignKey({
			columns: [table.billPaymentId],
			foreignColumns: [billPayments.id],
			name: "bill_payment_lines_bill_payment_id_bill_payments_id_fk"
		}).onDelete("cascade"),
]);

export const billItems = pgTable("bill_items", {
	id: serial().primaryKey().notNull(),
	billId: varchar("bill_id").notNull(),
	description: text(),
	quantity: numeric({ precision: 10, scale:  2 }),
	unitPrice: numeric("unit_price", { precision: 10, scale:  2 }),
	taxAmount: numeric("tax_amount", { precision: 10, scale:  2 }).notNull(),
	total: numeric({ precision: 10, scale:  2 }).notNull(),
	expenseAccountId: integer("expense_account_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	vatType: vatType("vat_type").default('exclusive').notNull(),
	vatRate: numeric("vat_rate", { precision: 10, scale:  2 }).default('16').notNull(),
	subTotal: numeric("sub_total", { precision: 10, scale:  2 }).notNull(),
}, (table) => [
	index("idx_bill_items_bill_id").using("btree", table.billId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.billId],
			foreignColumns: [bills.id],
			name: "bill_items_bill_id_bills_id_fk"
		}),
	foreignKey({
			columns: [table.expenseAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "bill_items_expense_account_id_ledger_accounts_id_fk"
		}),
]);

export const bankAccounts = pgTable("bank_accounts", {
	id: varchar().primaryKey().notNull(),
	accountId: integer("account_id").notNull(),
	bankName: varchar("bank_name", { length: 255 }).notNull(),
	accountNumber: varchar("account_number", { length: 50 }).notNull(),
	currencyCode: varchar("currency_code", { length: 3 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("bank_accounts_account_number_idx").using("btree", table.accountNumber.asc().nullsLast().op("text_ops")),
	index("bank_accounts_bank_name_idx").using("btree", table.bankName.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [ledgerAccounts.id],
			name: "bank_accounts_account_id_ledger_accounts_id_fk"
		}).onDelete("cascade"),
]);

export const bankPostings = pgTable("bank_postings", {
	id: varchar().primaryKey().notNull(),
	transactionDate: date("transaction_date").notNull(),
	bankId: varchar("bank_id").notNull(),
	dc: lineDc().notNull(),
	amount: numeric().notNull(),
	reference: varchar({ length: 255 }).notNull(),
	cleared: boolean().default(false),
	clearedAt: date("cleared_at"),
	narration: varchar({ length: 255 }),
	sourceType: varchar("source_type", { length: 50 }),
	sourceId: varchar("source_id", { length: 50 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	counterAccountId: integer("counter_account_id"),
}, (table) => [
	index("bank_postings_bank_id_idx").using("btree", table.bankId.asc().nullsLast().op("text_ops")),
	index("bank_postings_reference_idx").using("btree", table.reference.asc().nullsLast().op("text_ops")),
	index("bank_postings_transaction_date_idx").using("btree", table.transactionDate.asc().nullsLast().op("date_ops")),
	foreignKey({
			columns: [table.bankId],
			foreignColumns: [bankAccounts.id],
			name: "bank_postings_bank_id_bank_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.counterAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "bank_postings_counter_account_id_ledger_accounts_id_fk"
		}),
]);

export const migrations = pgTable("migrations", {
	id: serial().primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	timestamp: bigint({ mode: "number" }).notNull(),
	name: varchar().notNull(),
});

export const executionEntity = pgTable("execution_entity", {
	id: serial().primaryKey().notNull(),
	data: text().notNull(),
	finished: boolean().notNull(),
	mode: varchar().notNull(),
	retryOf: varchar(),
	retrySuccessId: varchar(),
	startedAt: timestamp({ mode: 'string' }).notNull(),
	stoppedAt: timestamp({ mode: 'string' }),
	workflowData: json().notNull(),
	workflowId: varchar(),
	waitTill: timestamp({ mode: 'string' }),
}, (table) => [
	index("IDX_33228da131bb1112247cf52a42").using("btree", table.stoppedAt.asc().nullsLast().op("timestamp_ops")),
	index("IDX_4f474ac92be81610439aaad61e").using("btree", table.workflowId.asc().nullsLast().op("int4_ops"), table.finished.asc().nullsLast().op("text_ops"), table.id.asc().nullsLast().op("int4_ops")),
	index("IDX_58154df94c686818c99fb754ce").using("btree", table.workflowId.asc().nullsLast().op("int4_ops"), table.waitTill.asc().nullsLast().op("int4_ops"), table.id.asc().nullsLast().op("text_ops")),
	index("IDX_72ffaaab9f04c2c1f1ea86e662").using("btree", table.finished.asc().nullsLast().op("int4_ops"), table.id.asc().nullsLast().op("bool_ops")),
	index("IDX_85b981df7b444f905f8bf50747").using("btree", table.waitTill.asc().nullsLast().op("int4_ops"), table.id.asc().nullsLast().op("timestamp_ops")),
	index("IDX_d160d4771aba5a0d78943edbe3").using("btree", table.workflowId.asc().nullsLast().op("int4_ops"), table.id.asc().nullsLast().op("text_ops")),
	index("idx_33228da131bb1112247cf52a42").using("btree", table.stoppedAt.asc().nullsLast().op("timestamp_ops")),
]);

export const financialYears = pgTable("financial_years", {
	id: varchar().primaryKey().notNull(),
	name: text().notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	closed: boolean().default(false).notNull(),
	closedDate: date("closed_date"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("financial_years_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	index("financial_years_start_date_idx").using("btree", table.startDate.asc().nullsLast().op("date_ops")),
]);

export const credentialsEntity = pgTable("credentials_entity", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 128 }).notNull(),
	data: text().notNull(),
	type: varchar({ length: 128 }).notNull(),
	nodesAccess: json().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
}, (table) => [
	index("idx_07fde106c0b471d8cc80a64fc8").using("btree", table.type.asc().nullsLast().op("text_ops")),
]);

export const memberRegistrationLinks = pgTable("member_registration_links", {
	id: serial().primaryKey().notNull(),
	memberId: varchar("member_id").notNull(),
	shortCode: varchar("short_code", { length: 10 }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
	usedAt: timestamp("used_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "member_registration_links_member_id_members_id_fk"
		}).onDelete("cascade"),
	unique("member_registration_links_short_code_unique").on(table.shortCode),
]);

export const tagEntity = pgTable("tag_entity", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 24 }).notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
}, (table) => [
	uniqueIndex("idx_812eb05f7451ca757fb98444ce").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const workflowEntity = pgTable("workflow_entity", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 128 }).notNull(),
	active: boolean().notNull(),
	nodes: json().notNull(),
	connections: json().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	settings: json(),
	staticData: json(),
}, (table) => [
	uniqueIndex("IDX_a252c527c4c89237221fe2c0ab").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const rolePermissions = pgTable("role_permissions", {
	roleId: varchar("role_id", { length: 36 }).notNull(),
	permissionId: varchar("permission_id", { length: 36 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.roleId, table.permissionId], name: "role_permissions_role_id_permission_id_pk"}),
]);

export const userRoles = pgTable("user_roles", {
	userId: varchar("user_id", { length: 36 }).notNull(),
	roleId: varchar("role_id", { length: 36 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.userId, table.roleId], name: "user_roles_user_id_role_id_pk"}),
]);

export const workflowsTags = pgTable("workflows_tags", {
	workflowId: integer().notNull(),
	tagId: integer().notNull(),
}, (table) => [
	index("idx_31140eb41f019805b40d008744").using("btree", table.workflowId.asc().nullsLast().op("int4_ops")),
	index("idx_5e29bfe9e22c5d6567f509d4a4").using("btree", table.tagId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.workflowId],
			foreignColumns: [workflowEntity.id],
			name: "FK_31140eb41f019805b40d0087449"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tagEntity.id],
			name: "FK_5e29bfe9e22c5d6567f509d4a46"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.workflowId, table.tagId], name: "PK_a60448a90e51a114e95e2a125b3"}),
]);

export const webhookEntity = pgTable("webhook_entity", {
	workflowId: integer().notNull(),
	webhookPath: varchar().notNull(),
	method: varchar().notNull(),
	node: varchar().notNull(),
	webhookId: varchar(),
	pathLength: integer(),
}, (table) => [
	index("idx_16f4436789e804e3e1c9eeb240").using("btree", table.webhookId.asc().nullsLast().op("int4_ops"), table.method.asc().nullsLast().op("int4_ops"), table.pathLength.asc().nullsLast().op("int4_ops")),
	primaryKey({ columns: [table.webhookPath, table.method], name: "PK_b21ace2e13596ccd87dc9bf4ea6"}),
]);
export const vwAttendanceDetails = pgView("vw_attendance_details", {	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	memberName: text("member_name"),
	image: varchar({ length: 255 }),
	checkInTime: timestamp("check_in_time", { withTimezone: true, mode: 'string' }),
	checkOutTime: timestamp("check_out_time", { withTimezone: true, mode: 'string' }),
	duration: interval(),
	activePlanName: varchar("active_plan_name"),
	nextRenewalDate: date("next_renewal_date"),
}).as(sql`SELECT al.id, (m.first_name::text || ' '::text) || m.last_name::text AS member_name, m.image, al.check_in_time, al.check_out_time, al.check_out_time - al.check_in_time AS duration, am.plan_name AS active_plan_name, am.end_date AS next_renewal_date FROM attendance_logs al JOIN members m ON al.member_id::text = m.id::text LEFT JOIN LATERAL ( SELECT mp.name AS plan_name, mm.end_date FROM member_memberships mm JOIN membership_plans mp ON mp.id::text = mm.membership_plan_id::text WHERE mm.member_id::text = m.id::text AND mm.status = 'active'::membership_status AND mm.start_date <= CURRENT_DATE AND mm.end_date >= CURRENT_DATE ORDER BY mm.end_date DESC LIMIT 1) am ON true`);

export const vwMemberOverview = pgView("vw_member_overview", {	id: varchar(),
	memberNo: integer("member_no"),
	firstName: varchar("first_name"),
	lastName: varchar("last_name"),
	fullName: text("full_name"),
	image: varchar({ length: 255 }),
	contact: varchar({ length: 15 }),
	gender: gender(),
	memberStatus: memberStatus("member_status"),
	activePlanId: varchar("active_plan_id"),
	activePlanName: varchar("active_plan_name"),
	nextRenewalDate: date("next_renewal_date"),
	lastVisit: timestamp("last_visit", { withTimezone: true, mode: 'string' }),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	emergencyContactName: varchar("emergency_contact_name", { length: 100 }),
	emergencyContactNo: varchar("emergency_contact_no", { length: 15 }),
	banned: boolean(),
	completedRegistration: boolean("completed_registration"),
}).as(sql`SELECT m.id, m.member_no, m.first_name, m.last_name, (m.first_name::text || ' '::text) || m.last_name::text AS full_name, m.image, m.contact, m.gender, m.member_status, am.plan_id AS active_plan_id, am.plan_name AS active_plan_name, am.end_date AS next_renewal_date, la.last_visit, m.notes, m.created_at, m.emergency_contact_name, m.emergency_contact_no, ( SELECT users.banned FROM users WHERE users.member_id::text = m.id::text) AS banned, m.completed_registration FROM members m LEFT JOIN LATERAL ( SELECT mp.id AS plan_id, mp.name AS plan_name, mm.end_date FROM member_memberships mm JOIN membership_plans mp ON mp.id::text = mm.membership_plan_id::text WHERE mm.member_id::text = m.id::text AND mm.status = 'active'::membership_status AND mm.start_date <= CURRENT_DATE AND mm.end_date >= CURRENT_DATE ORDER BY mm.end_date DESC LIMIT 1) am ON true LEFT JOIN LATERAL ( SELECT max(al.check_in_time) AS last_visit FROM attendance_logs al WHERE al.member_id::text = m.id::text) la ON true WHERE m.deleted_at IS NULL`);

export const vwInvoices = pgView("vw_invoices", {	id: varchar(),
	invoiceDate: date("invoice_date"),
	dueDate: date("due_date"),
	vendorId: varchar("vendor_id"),
	invoiceNo: varchar("invoice_no"),
	name: varchar(),
	total: numeric({ precision: 10, scale:  2 }),
	totalPayment: numeric("total_payment"),
	balance: numeric(),
	status: billStatus(),
}).as(sql`SELECT b.id, b.invoice_date, b.due_date, b.vendor_id, b.invoice_no, v.name, b.total, COALESCE(sum(bpl.amount), 0::numeric) AS total_payment, b.total - COALESCE(sum(bpl.amount), 0::numeric) AS balance, b.status FROM bills b JOIN vendors v ON b.vendor_id::text = v.id::text LEFT JOIN bill_payment_lines bpl ON bpl.bill_id::text = b.id::text AND bpl.dc = 'credit'::line_dc GROUP BY b.id, b.invoice_date, b.due_date, b.invoice_no, v.name, b.total ORDER BY b.invoice_date DESC, b.invoice_no DESC`);