import { pgTable, index, uniqueIndex, uuid, varchar, text, boolean, timestamp, foreignKey, numeric, integer, serial, unique, bigserial, date, jsonb, check, inet, primaryKey, pgView, bigint, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const accessControlStatus = pgEnum("access_control_status", ['not_synced', 'pending_sync', 'pending_biometric_enrollment', 'active', 'disabled', 'frozen', 'sync_failed', 'resigned', 'pending_delete', 'deleted'])
export const accessSyncAction = pgEnum("access_sync_action", ['CREATE_EMPLOYEE', 'UPDATE_EMPLOYEE', 'ENABLE_ACCESS', 'DISABLE_ACCESS', 'FULL_RECONCILE', 'RESIGN_EMPLOYEE', 'REINSTATE_EMPLOYEE', 'DELETE_EMPLOYEE'])
export const accessSyncStatus = pgEnum("access_sync_status", ['pending', 'processing', 'succeeded', 'failed', 'cancelled'])
export const accountType = pgEnum("account_type", ['asset', 'liability', 'equity', 'revenue', 'expense'])
export const billStatus = pgEnum("bill_status", ['draft', 'pending', 'approved', 'paid', 'overdue', 'cancelled', 'partially-paid'])
export const biometricEnrollmentStatus = pgEnum("biometric_enrollment_status", ['not_required', 'pending', 'face_enrolled', 'fingerprint_enrolled', 'face_and_fingerprint_enrolled', 'unknown'])
export const biotimePersonType = pgEnum("biotime_person_type", ['member', 'employee'])
export const complimentaryRequestStatus = pgEnum("complimentary_request_status", ['pending', 'approved', 'rejected'])
export const creditNoteStatus = pgEnum("credit_note_status", ['active', 'partially_redeemed', 'fully_redeemed', 'expired'])
export const discountType = pgEnum("discount_type", ['none', 'amount', 'percentage'])
export const employmentStatus = pgEnum("employment_status", ['active', 'on_leave', 'terminated', 'resigned'])
export const employmentType = pgEnum("employment_type", ['full_time', 'part_time', 'contract', 'temporary'])
export const expensePaymentMethod = pgEnum("expense_payment_method", ['cash', 'cheque', 'mpesa', 'bank'])
export const gender = pgEnum("gender", ['male', 'female', 'unspecified', 'other'])
export const invoiceStatus = pgEnum("invoice_status", ['draft', 'open', 'partially_paid', 'paid', 'cancelled', 'overdue'])
export const leaveApplicableGender = pgEnum("leave_applicable_gender", ['male', 'female'])
export const leaveStatus = pgEnum("leave_status", ['pending', 'approved', 'rejected', 'cancelled'])
export const leaveType = pgEnum("leave_type", ['annual', 'sick', 'maternity', 'paternity', 'pre_adoptive', 'compassionate', 'study', 'unpaid'])
export const ledgerAccountRole = pgEnum("ledger_account_role", ['accounts_payable', 'vat_input', 'wht_payable', 'opening_balance_equity'])
export const lineDc = pgEnum("line_dc", ['debit', 'credit'])
export const loanStatus = pgEnum("loan_status", ['pending', 'active', 'paused', 'fully_paid', 'written_off', 'rejected'])
export const memberStatus = pgEnum("member_status", ['active', 'inactive', 'frozen', 'terminated'])
export const membershipStatus = pgEnum("membership_status", ['active', 'inactive', 'frozen', 'terminated', 'expired', 'pending', 'cancelled', 'suspended', ''])
export const mpesaStkStatus = pgEnum("mpesa_stk_status", ['pending', 'success', 'failed', 'timeout', 'cancelled'])
export const normalBalance = pgEnum("normal_balance", ['debit', 'credit'])
export const overtimeStatus = pgEnum("overtime_status", ['draft', 'approved', 'paid'])
export const payFrequency = pgEnum("pay_frequency", ['monthly', 'bi_weekly', 'weekly'])
export const paymentChannel = pgEnum("payment_channel", ['portal', 'staff', 'auto_renewal'])
export const paymentMethod = pgEnum("payment_method", ['mpesa_stk', 'mpesa_manual', 'cash', 'card', 'bank_transfer', 'complimentary'])
export const paymentStatus = pgEnum("payment_status", ['pending', 'completed', 'failed', 'cancelled', 'refunded', 'voided'])
export const payrollAccountRole = pgEnum("payroll_account_role", ['salaries_expense', 'overtime_expense', 'bonus_expense', 'nssf_employer_expense', 'shif_employer_expense', 'ahl_employer_expense', 'nita_expense', 'pension_employer_expense', 'loans_receivable', 'salary_advance_receivable', 'paye_payable', 'nssf_payable', 'shif_payable', 'ahl_payable', 'nita_payable', 'helb_payable', 'loan_deductions_payable', 'other_deductions_payable', 'net_salaries_payable', 'salary_advance_payable'])
export const payrollDeductionType = pgEnum("payroll_deduction_type", ['company_loan', 'salary_advance', 'sacco', 'union_dues', 'court_order', 'insurance', 'welfare', 'helb', 'other'])
export const payrollPeriodStatus = pgEnum("payroll_period_status", ['draft', 'processing', 'approved', 'paid', 'closed', 'cancelled'])
export const payrollRemittanceItemType = pgEnum("payroll_remittance_item_type", ['paye', 'nssf', 'shif', 'ahl', 'nita', 'helb'])
export const payrollSlipStatus = pgEnum("payroll_slip_status", ['draft', 'approved', 'cancelled'])
export const recurrencyPeriod = pgEnum("recurrency_period", ['daily', 'weekly', 'monthly', 'quarterly', 'biannually', 'yearly'])
export const salaryAdvanceStatus = pgEnum("salary_advance_status", ['pending', 'approved', 'disbursed', 'recovering', 'fully_recovered', 'rejected', 'cancelled'])
export const smsBroadcastStatus = pgEnum("sms_broadcast_status", ['draft', 'sent', 'sending', 'failed'])
export const smsFilterCriteria = pgEnum("sms_filter_criteria", ['by status', 'by plan', 'all members', 'specific members'])
export const statutoryRateCategory = pgEnum("statutory_rate_category", ['paye_band', 'nssf_tier_1_upper_limit', 'nssf_tier_2_upper_limit', 'nssf_contribution_rate', 'nssf_max_employee', 'nssf_max_employer', 'shif', 'ahl_employee_rate', 'ahl_employer_rate', 'nita', 'personal_relief', 'insurance_relief', 'pension_cap', 'mortgage_cap', 'post_retirement_medical_cap', 'non_cash_benefit_exempt', 'meal_allowance_exempt'])
export const userType = pgEnum("user_type", ['admin', 'staff', 'member'])
export const vatType = pgEnum("vat_type", ['none', 'inclusive', 'exclusive'])
export const whtCategory = pgEnum("wht_category", ['professional_management_training_fee', 'rent', 'contractual_fee', 'other'])
export const whtCorrectionStatus = pgEnum("wht_correction_status", ['already_remitted', 'pending'])


export const accessControlAgents = pgTable("access_control_agents", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	machineName: varchar("machine_name", { length: 100 }),
	apiKeyHash: text("api_key_hash").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	lastSeenAt: timestamp("last_seen_at", { withTimezone: true, mode: 'string' }),
	lastIpAddress: varchar("last_ip_address", { length: 100 }),
	status: varchar({ length: 30 }).default('offline').notNull(),
	lastError: text("last_error"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_access_control_agents_status").using("btree", table.status.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_access_control_agents_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
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

export const addons = pgTable("addons", {
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	description: text(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	perMember: boolean("per_member").default(false).notNull(),
	revenueAccountId: integer("revenue_account_id").notNull(),
	active: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.revenueAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "addons_revenue_account_id_ledger_accounts_id_fk"
		}),
]);

export const addonInvoiceLines = pgTable("addon_invoice_lines", {
	id: serial().primaryKey().notNull(),
	addonInvoiceId: varchar("addon_invoice_id").notNull(),
	addonId: varchar("addon_id"),
	addonName: varchar("addon_name", { length: 255 }).notNull(),
	unitAmount: numeric("unit_amount", { precision: 10, scale:  2 }).notNull(),
	perMember: boolean("per_member").notNull(),
	revenueAccountId: integer("revenue_account_id").notNull(),
	numberOfPeriods: integer("number_of_periods").notNull(),
	numberOfMembers: integer("number_of_members").default(1).notNull(),
	lineSubtotal: numeric("line_subtotal", { precision: 18, scale:  2 }).notNull(),
	taxAmount: numeric("tax_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	lineTotal: numeric("line_total", { precision: 18, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.addonId],
			foreignColumns: [addons.id],
			name: "addon_invoice_lines_addon_id_addons_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.addonInvoiceId],
			foreignColumns: [addonInvoices.id],
			name: "addon_invoice_lines_addon_invoice_id_addon_invoices_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.revenueAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "addon_invoice_lines_revenue_account_id_ledger_accounts_id_fk"
		}),
]);

export const addonInvoices = pgTable("addon_invoices", {
	id: varchar().primaryKey().notNull(),
	invoiceNo: varchar("invoice_no", { length: 50 }).notNull(),
	memberId: varchar("member_id").notNull(),
	paymentId: varchar("payment_id"),
	paymentDate: timestamp("payment_date", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	numberOfPeriods: integer("number_of_periods").default(1).notNull(),
	numberOfMembers: integer("number_of_members").default(1).notNull(),
	subtotalAmount: numeric("subtotal_amount", { precision: 18, scale:  2 }).notNull(),
	taxAmount: numeric("tax_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	totalAmount: numeric("total_amount", { precision: 18, scale:  2 }).notNull(),
	vatType: vatType("vat_type").default('none').notNull(),
	status: paymentStatus().default('completed').notNull(),
	method: paymentMethod().notNull(),
	channel: paymentChannel().notNull(),
	reference: varchar({ length: 50 }),
	notes: text(),
	createdByUserId: varchar("created_by_user_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	voidedAt: timestamp("voided_at", { withTimezone: true, mode: 'string' }),
	voidedByUserId: varchar("voided_by_user_id"),
	voidReason: text("void_reason"),
}, (table) => [
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "addon_invoices_member_id_members_id_fk"
		}),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "addon_invoices_payment_id_payments_id_fk"
		}),
	unique("addon_invoices_invoice_no_unique").on(table.invoiceNo),
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
	biotimeId: integer("biotime_id"),
}, (table) => [
	index("idx_attendance_logs_check_in_time").using("btree", table.checkInTime.asc().nullsLast().op("timestamptz_ops")),
	index("idx_attendance_logs_member_id_check_in_time").using("btree", table.memberId.asc().nullsLast().op("text_ops"), table.checkInTime.desc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "attendance_logs_member_id_members_id_fk"
		}),
	unique("attendance_logs_biotime_id_unique").on(table.biotimeId),
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

export const accessControlSyncJobs = pgTable("access_control_sync_jobs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	memberId: varchar("member_id"),
	action: accessSyncAction().notNull(),
	status: accessSyncStatus().default('pending').notNull(),
	payload: jsonb().notNull(),
	idempotencyKey: varchar("idempotency_key", { length: 255 }).notNull(),
	attempts: integer().default(0).notNull(),
	maxAttempts: integer("max_attempts").default(10).notNull(),
	claimedAt: timestamp("claimed_at", { withTimezone: true, mode: 'string' }),
	claimedUntil: timestamp("claimed_until", { withTimezone: true, mode: 'string' }),
	lastError: text("last_error"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
	biotimePersonProfileId: uuid("biotime_person_profile_id").notNull(),
	personType: biotimePersonType("person_type").default('member').notNull(),
	employeeId: varchar("employee_id"),
}, (table) => [
	index("idx_access_sync_jobs_member").using("btree", table.memberId.asc().nullsLast().op("text_ops")),
	index("idx_access_sync_jobs_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	uniqueIndex("uq_access_sync_jobs_idempotency").using("btree", table.idempotencyKey.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.biotimePersonProfileId],
			foreignColumns: [biotimePersonProfiles.id],
			name: "access_control_sync_jobs_biotime_person_profile_id_biotime_pers"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "access_control_sync_jobs_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "access_control_sync_jobs_member_id_members_id_fk"
		}).onDelete("cascade"),
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
			columns: [table.bankId],
			foreignColumns: [bankAccounts.id],
			name: "bill_payments_bank_id_bank_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "bill_payments_created_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.creditingAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "bill_payments_crediting_account_id_ledger_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.id],
			name: "bill_payments_vendor_id_vendors_id_fk"
		}),
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
	index("idx_bill_payment_lines_bill_id_dc").using("btree", table.billId.asc().nullsLast().op("text_ops"), table.dc.asc().nullsLast().op("text_ops")),
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

export const biotimeAttendanceSyncState = pgTable("biotime_attendance_sync_state", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	lastSuccessfulSyncAt: timestamp("last_successful_sync_at", { withTimezone: true, mode: 'string' }),
	lastAttemptedSyncAt: timestamp("last_attempted_sync_at", { withTimezone: true, mode: 'string' }),
	lastFetchedStartTime: timestamp("last_fetched_start_time", { withTimezone: true, mode: 'string' }),
	lastFetchedEndTime: timestamp("last_fetched_end_time", { withTimezone: true, mode: 'string' }),
	lastInsertedCount: integer("last_inserted_count").default(0).notNull(),
	lastSkippedDuplicateCount: integer("last_skipped_duplicate_count").default(0).notNull(),
	lastUnmappedCount: integer("last_unmapped_count").default(0).notNull(),
	lastError: text("last_error"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	lastEmployeeInsertedCount: integer("last_employee_inserted_count").default(0).notNull(),
});

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
	whtAmount: numeric("wht_amount", { precision: 10, scale:  2 }).default('0').notNull(),
	whtCertificateNo: varchar("wht_certificate_no"),
	whtCertificateIssuedDate: date("wht_certificate_issued_date"),
}, (table) => [
	index("idx_bills_due_date").using("btree", table.dueDate.asc().nullsLast().op("date_ops")),
	index("idx_bills_invoice_date").using("btree", table.invoiceDate.asc().nullsLast().op("date_ops")),
	index("idx_bills_invoice_no").using("btree", table.invoiceNo.asc().nullsLast().op("text_ops")),
	index("idx_bills_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("idx_bills_vendor_id").using("btree", table.vendorId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "bills_created_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.id],
			name: "bills_vendor_id_vendors_id_fk"
		}),
	unique("bills_invoice_no_unique").on(table.invoiceNo),
]);

export const biotimePersonProfiles = pgTable("biotime_person_profiles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	personType: biotimePersonType("person_type").notNull(),
	memberId: varchar("member_id"),
	employeeId: varchar("employee_id"),
	biotimeEmployeeId: integer("biotime_employee_id"),
	biotimeEmployeeCode: varchar("biotime_employee_code", { length: 50 }).notNull(),
	biotimeDepartmentId: integer("biotime_department_id").notNull(),
	authorizedAreaId: integer("authorized_area_id").default(2).notNull(),
	unauthorizedAreaId: integer("unauthorized_area_id").default(1).notNull(),
	currentAreaId: integer("current_area_id"),
	desiredAccessEnabled: boolean("desired_access_enabled").default(false).notNull(),
	accessControlStatus: accessControlStatus("access_control_status").default('not_synced').notNull(),
	biometricEnrollmentStatus: biometricEnrollmentStatus("biometric_enrollment_status").default('pending').notNull(),
	faceEnrolled: boolean("face_enrolled").default(false).notNull(),
	fingerprintEnrolled: boolean("fingerprint_enrolled").default(false).notNull(),
	biotimeResignId: integer("biotime_resign_id"),
	lastSyncedAt: timestamp("last_synced_at", { withTimezone: true, mode: 'string' }),
	lastSyncAttemptAt: timestamp("last_sync_attempt_at", { withTimezone: true, mode: 'string' }),
	lastSyncError: text("last_sync_error"),
	lastSyncPayload: jsonb("last_sync_payload"),
	lastSyncResponse: jsonb("last_sync_response"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_biotime_person_profiles_employee").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_biotime_person_profiles_member").using("btree", table.memberId.asc().nullsLast().op("text_ops")),
	index("idx_biotime_person_profiles_status").using("btree", table.accessControlStatus.asc().nullsLast().op("enum_ops")),
	index("idx_biotime_person_profiles_type").using("btree", table.personType.asc().nullsLast().op("enum_ops")),
	uniqueIndex("uq_biotime_person_profiles_biotime_id").using("btree", table.biotimeEmployeeId.asc().nullsLast().op("int4_ops")),
	uniqueIndex("uq_biotime_person_profiles_emp_code").using("btree", table.biotimeEmployeeCode.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "biotime_person_profiles_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "biotime_person_profiles_member_id_members_id_fk"
		}).onDelete("cascade"),
]);

export const biotimeSettings = pgTable("biotime_settings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	baseUrl: varchar("base_url", { length: 255 }).default('http://127.0.0.1/').notNull(),
	defaultDepartmentId: integer("default_department_id").default(1).notNull(),
	authorizedAreaId: integer("authorized_area_id").default(2).notNull(),
	unauthorizedAreaId: integer("unauthorized_area_id").default(1).notNull(),
	deviceSerialNumber: varchar("device_serial_number", { length: 100 }),
	syncEnabled: boolean("sync_enabled").default(true).notNull(),
	pollIntervalSeconds: integer("poll_interval_seconds").default(30).notNull(),
	batchSize: integer("batch_size").default(10).notNull(),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	username: varchar({ length: 255 }),
	password: text(),
});

export const biotimeUnmappedAttendanceTransactions = pgTable("biotime_unmapped_attendance_transactions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	biotimeId: integer("biotime_id").notNull(),
	empCode: varchar("emp_code", { length: 50 }).notNull(),
	punchTime: timestamp("punch_time", { withTimezone: true, mode: 'string' }).notNull(),
	punchState: varchar("punch_state", { length: 10 }),
	punchStateDisplay: varchar("punch_state_display", { length: 50 }),
	terminalSn: varchar("terminal_sn", { length: 100 }),
	rawPayload: jsonb("raw_payload"),
	resolved: boolean().default(false).notNull(),
	resolvedAt: timestamp("resolved_at", { withTimezone: true, mode: 'string' }),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_biotime_unmapped_attendance_emp_code").using("btree", table.empCode.asc().nullsLast().op("text_ops")),
	index("idx_biotime_unmapped_attendance_resolved").using("btree", table.resolved.asc().nullsLast().op("bool_ops")),
	uniqueIndex("uq_biotime_unmapped_attendance_biotime_id").using("btree", table.biotimeId.asc().nullsLast().op("int4_ops")),
]);

export const creditNoteRedemptions = pgTable("credit_note_redemptions", {
	id: varchar().primaryKey().notNull(),
	creditNoteId: varchar("credit_note_id").notNull(),
	paymentId: varchar("payment_id"),
	addonInvoiceId: varchar("addon_invoice_id"),
	amountApplied: numeric("amount_applied", { precision: 18, scale:  2 }).notNull(),
	redeemedAt: timestamp("redeemed_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("credit_note_redemptions_credit_note_id_idx").using("btree", table.creditNoteId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.addonInvoiceId],
			foreignColumns: [addonInvoices.id],
			name: "credit_note_redemptions_addon_invoice_id_addon_invoices_id_fk"
		}),
	foreignKey({
			columns: [table.creditNoteId],
			foreignColumns: [creditNotes.id],
			name: "credit_note_redemptions_credit_note_id_credit_notes_id_fk"
		}),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "credit_note_redemptions_payment_id_payments_id_fk"
		}),
	check("chk_credit_note_redemptions_exactly_one_target", sql`((payment_id IS NOT NULL) AND (addon_invoice_id IS NULL)) OR ((payment_id IS NULL) AND (addon_invoice_id IS NOT NULL))`),
]);

export const creditNotes = pgTable("credit_notes", {
	id: varchar().primaryKey().notNull(),
	creditNoteNo: varchar("credit_note_no", { length: 50 }).notNull(),
	memberId: varchar("member_id").notNull(),
	originalPaymentId: varchar("original_payment_id").notNull(),
	originalMembershipId: varchar("original_membership_id").notNull(),
	reason: text().notNull(),
	unusedDays: integer("unused_days").notNull(),
	dailyRate: numeric("daily_rate", { precision: 18, scale:  2 }).notNull(),
	suggestedAmount: numeric("suggested_amount", { precision: 18, scale:  2 }).notNull(),
	creditSubtotal: numeric("credit_subtotal", { precision: 18, scale:  2 }).notNull(),
	creditTax: numeric("credit_tax", { precision: 18, scale:  2 }).default('0').notNull(),
	amount: numeric({ precision: 18, scale:  2 }).notNull(),
	balanceRemaining: numeric("balance_remaining", { precision: 18, scale:  2 }).notNull(),
	status: creditNoteStatus().default('active').notNull(),
	expiresAt: date("expires_at").notNull(),
	issuedByUserId: varchar("issued_by_user_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("credit_notes_member_id_idx").using("btree", table.memberId.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_credit_notes_original_membership_id").using("btree", table.originalMembershipId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.issuedByUserId],
			foreignColumns: [users.id],
			name: "credit_notes_issued_by_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "credit_notes_member_id_members_id_fk"
		}),
	foreignKey({
			columns: [table.originalMembershipId],
			foreignColumns: [memberMemberships.id],
			name: "credit_notes_original_membership_id_member_memberships_id_fk"
		}),
	foreignKey({
			columns: [table.originalPaymentId],
			foreignColumns: [payments.id],
			name: "credit_notes_original_payment_id_payments_id_fk"
		}),
	unique("credit_notes_credit_note_no_unique").on(table.creditNoteNo),
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

export const employeeGymAccessLogs = pgTable("employee_gym_access_logs", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	employeeId: varchar("employee_id").notNull(),
	punchTime: timestamp("punch_time", { withTimezone: true, mode: 'string' }).notNull(),
	source: varchar({ length: 30 }).default('biotime'),
	deviceId: varchar("device_id", { length: 100 }),
	notes: text(),
	biotimeId: integer("biotime_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "employee_gym_access_logs_employee_id_employees_id_fk"
		}),
	unique("employee_gym_access_logs_biotime_id_unique").on(table.biotimeId),
]);

export const employeeLeaveBalances = pgTable("employee_leave_balances", {
	id: serial().primaryKey().notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	leaveType: leaveType("leave_type").notNull(),
	leaveYear: integer("leave_year").notNull(),
	entitledDays: numeric("entitled_days", { precision: 6, scale:  2 }).default('0').notNull(),
	carriedForwardDays: numeric("carried_forward_days", { precision: 6, scale:  2 }).default('0').notNull(),
	adjustmentDays: numeric("adjustment_days", { precision: 6, scale:  2 }).default('0').notNull(),
	takenDays: numeric("taken_days", { precision: 6, scale:  2 }).default('0').notNull(),
	carryForwardExpiresAt: timestamp("carry_forward_expires_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_employee_leave_balances_employee").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_employee_leave_balances_year").using("btree", table.leaveYear.asc().nullsLast().op("int4_ops")),
	uniqueIndex("uq_employee_leave_balance_employee_type_year").using("btree", table.employeeId.asc().nullsLast().op("int4_ops"), table.leaveType.asc().nullsLast().op("int4_ops"), table.leaveYear.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "employee_leave_balances_employee_id_employees_id_fk"
		}).onDelete("cascade"),
]);

export const employeeLoans = pgTable("employee_loans", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	applicationDate: date("application_date").default(sql`CURRENT_DATE`).notNull(),
	principalAmount: numeric("principal_amount", { precision: 14, scale:  2 }).notNull(),
	annualInterestRate: numeric("annual_interest_rate", { precision: 7, scale:  4 }).default('0').notNull(),
	requestedInstalments: integer("requested_instalments").notNull(),
	purpose: text(),
	status: loanStatus().default('pending').notNull(),
	approvedBy: varchar("approved_by", { length: 255 }),
	approvedAt: timestamp("approved_at", { withTimezone: true, mode: 'string' }),
	approvedAmount: numeric("approved_amount", { precision: 14, scale:  2 }),
	approvedInstalments: integer("approved_instalments"),
	disbursementAccountId: integer("disbursement_account_id"),
	disbursementDate: date("disbursement_date"),
	repaymentStartMonth: integer("repayment_start_month"),
	repaymentStartYear: integer("repayment_start_year"),
	monthlyInstalment: numeric("monthly_instalment", { precision: 14, scale:  2 }),
	disbursementJournalEntryId: integer("disbursement_journal_entry_id"),
	rejectedBy: varchar("rejected_by", { length: 255 }),
	rejectedAt: timestamp("rejected_at", { withTimezone: true, mode: 'string' }),
	rejectionReason: text("rejection_reason"),
	outstandingBalance: numeric("outstanding_balance", { precision: 14, scale:  2 }),
	totalPrincipalPaid: numeric("total_principal_paid", { precision: 14, scale:  2 }).default('0').notNull(),
	totalInterestPaid: numeric("total_interest_paid", { precision: 14, scale:  2 }).default('0').notNull(),
	instalmentsPaid: integer("instalments_paid").default(0).notNull(),
	pausedBy: varchar("paused_by", { length: 255 }),
	pausedAt: timestamp("paused_at", { withTimezone: true, mode: 'string' }),
	resumedBy: varchar("resumed_by", { length: 255 }),
	resumedAt: timestamp("resumed_at", { withTimezone: true, mode: 'string' }),
	settledDate: date("settled_date"),
	settlementJournalEntryId: integer("settlement_journal_entry_id"),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_employee_loans_disbursement_account_id").using("btree", table.disbursementAccountId.asc().nullsLast().op("int4_ops")),
	index("idx_employee_loans_employee_id").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_employee_loans_employee_status").using("btree", table.employeeId.asc().nullsLast().op("text_ops"), table.status.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.approvedBy],
			foreignColumns: [users.id],
			name: "employee_loans_approved_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.disbursementAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "employee_loans_disbursement_account_id_ledger_accounts_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.disbursementJournalEntryId],
			foreignColumns: [journalEntries.id],
			name: "employee_loans_disbursement_journal_entry_id_journal_entries_id"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "employee_loans_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.pausedBy],
			foreignColumns: [users.id],
			name: "employee_loans_paused_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.rejectedBy],
			foreignColumns: [users.id],
			name: "employee_loans_rejected_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.resumedBy],
			foreignColumns: [users.id],
			name: "employee_loans_resumed_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.settlementJournalEntryId],
			foreignColumns: [journalEntries.id],
			name: "employee_loans_settlement_journal_entry_id_journal_entries_id_f"
		}).onDelete("set null"),
	check("employee_loans_approved_instalments_range", sql`(approved_instalments IS NULL) OR ((approved_instalments >= 1) AND (approved_instalments <= 60))`),
	check("employee_loans_interest_rate_range", sql`(annual_interest_rate >= (0)::numeric) AND (annual_interest_rate <= (1)::numeric)`),
	check("employee_loans_repayment_start_month_range", sql`(repayment_start_month IS NULL) OR ((repayment_start_month >= 1) AND (repayment_start_month <= 12))`),
	check("employee_loans_repayment_start_year_range", sql`(repayment_start_year IS NULL) OR ((repayment_start_year >= 2000) AND (repayment_start_year <= 2100))`),
	check("employee_loans_requested_instalments_range", sql`(requested_instalments >= 1) AND (requested_instalments <= 60)`),
]);

export const departments = pgTable("departments", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	managerId: varchar("manager_id", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const complimentaryMembershipRequests = pgTable("complimentary_membership_requests", {
	id: varchar().primaryKey().notNull(),
	memberId: varchar("member_id").notNull(),
	planId: varchar("plan_id").notNull(),
	startDate: date("start_date").notNull(),
	numberOfPeriods: integer("number_of_periods").default(1).notNull(),
	reason: text().notNull(),
	status: complimentaryRequestStatus().default('pending').notNull(),
	requestedByUserId: varchar("requested_by_user_id").notNull(),
	reviewedByUserId: varchar("reviewed_by_user_id"),
	reviewedAt: timestamp("reviewed_at", { withTimezone: true, mode: 'string' }),
	rejectionReason: text("rejection_reason"),
	resultingPaymentId: varchar("resulting_payment_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_complimentary_requests_member_id").using("btree", table.memberId.asc().nullsLast().op("text_ops")),
	index("idx_complimentary_requests_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "complimentary_membership_requests_member_id_members_id_fk"
		}),
	foreignKey({
			columns: [table.planId],
			foreignColumns: [membershipPlans.id],
			name: "complimentary_membership_requests_plan_id_membership_plans_id_f"
		}),
	foreignKey({
			columns: [table.requestedByUserId],
			foreignColumns: [users.id],
			name: "complimentary_membership_requests_requested_by_user_id_users_id"
		}),
	foreignKey({
			columns: [table.resultingPaymentId],
			foreignColumns: [payments.id],
			name: "complimentary_membership_requests_resulting_payment_id_payments"
		}),
	foreignKey({
			columns: [table.reviewedByUserId],
			foreignColumns: [users.id],
			name: "complimentary_membership_requests_reviewed_by_user_id_users_id_"
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
			columns: [table.accountId],
			foreignColumns: [ledgerAccounts.id],
			name: "expense_details_account_id_ledger_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.expenseHeaderId],
			foreignColumns: [expenseHeaders.id],
			name: "expense_details_expense_header_id_expense_headers_id_fk"
		}),
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
			columns: [table.accountId],
			foreignColumns: [ledgerAccounts.id],
			name: "journal_lines_account_id_ledger_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.journalEntryId],
			foreignColumns: [journalEntries.id],
			name: "journal_lines_journal_entry_id_journal_entries_id_fk"
		}).onDelete("cascade"),
]);

export const leaveBalanceAdjustments = pgTable("leave_balance_adjustments", {
	id: serial().primaryKey().notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	leaveType: leaveType("leave_type").notNull(),
	leaveYear: integer("leave_year").notNull(),
	adjustmentDays: numeric("adjustment_days", { precision: 6, scale:  2 }).notNull(),
	reason: text().notNull(),
	performedBy: varchar("performed_by", { length: 255 }),
	appliedToBalanceAdjustmentTotal: boolean("applied_to_balance_adjustment_total").default(true).notNull(),
	warning: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_leave_balance_adjustments_employee").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_leave_balance_adjustments_year").using("btree", table.leaveYear.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "leave_balance_adjustments_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.performedBy],
			foreignColumns: [users.id],
			name: "leave_balance_adjustments_performed_by_users_id_fk"
		}).onDelete("set null"),
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
			columns: [table.bankId],
			foreignColumns: [bankAccounts.id],
			name: "expense_headers_bank_id_bank_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.createdByUserId],
			foreignColumns: [users.id],
			name: "expense_headers_created_by_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.creditingAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "expense_headers_crediting_account_id_ledger_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.payeeId],
			foreignColumns: [payees.id],
			name: "expense_headers_payee_id_payees_id_fk"
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

export const leaveEntitlements = pgTable("leave_entitlements", {
	id: serial().primaryKey().notNull(),
	leaveType: leaveType("leave_type").notNull(),
	annualDaysEntitled: numeric("annual_days_entitled", { precision: 6, scale:  2 }).notNull(),
	accrualRatePerMonth: numeric("accrual_rate_per_month", { precision: 6, scale:  4 }),
	isPaid: boolean("is_paid").default(true).notNull(),
	fullPayDays: numeric("full_pay_days", { precision: 6, scale:  2 }).default('0').notNull(),
	halfPayDays: numeric("half_pay_days", { precision: 6, scale:  2 }).default('0').notNull(),
	carryForwardAllowed: boolean("carry_forward_allowed").default(false).notNull(),
	carryForwardCapDays: numeric("carry_forward_cap_days", { precision: 6, scale:  2 }),
	carryForwardExpiryMonths: integer("carry_forward_expiry_months"),
	minServiceMonthsRequired: integer("min_service_months_required").default(0).notNull(),
	requiresMedicalCert: boolean("requires_medical_cert").default(false).notNull(),
	applicableGender: leaveApplicableGender("applicable_gender"),
	isOneOffEntitlement: boolean("is_one_off_entitlement").default(false).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("leave_entitlements_leave_type_unique").on(table.leaveType),
]);

export const ledgerAccountMappings = pgTable("ledger_account_mappings", {
	id: serial().primaryKey().notNull(),
	role: ledgerAccountRole().notNull(),
	accountId: integer("account_id").notNull(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_ledger_account_mappings_role").using("btree", table.role.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [ledgerAccounts.id],
			name: "ledger_account_mappings_account_id_ledger_accounts_id_fk"
		}),
	unique("ledger_account_mappings_role_unique").on(table.role),
]);

export const leaveRequests = pgTable("leave_requests", {
	id: varchar().primaryKey().notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	leaveType: leaveType("leave_type").notNull(),
	leaveYear: integer("leave_year").notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	workingDaysRequested: numeric("working_days_requested", { precision: 6, scale:  2 }).notNull(),
	reason: text(),
	status: leaveStatus().default('pending').notNull(),
	requestedBy: varchar("requested_by", { length: 255 }),
	approvedBy: varchar("approved_by", { length: 255 }),
	approvedAt: timestamp("approved_at", { withTimezone: true, mode: 'string' }),
	rejectionReason: text("rejection_reason"),
	cancelledBy: varchar("cancelled_by", { length: 255 }),
	cancelledAt: timestamp("cancelled_at", { withTimezone: true, mode: 'string' }),
	medicalCertPath: varchar("medical_cert_path", { length: 500 }),
	medicalCertificateRequired: boolean("medical_certificate_required").default(false).notNull(),
	affectsPayroll: boolean("affects_payroll").default(false).notNull(),
	payrollImpactNotes: text("payroll_impact_notes"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_leave_requests_dates").using("btree", table.startDate.asc().nullsLast().op("date_ops"), table.endDate.asc().nullsLast().op("date_ops")),
	index("idx_leave_requests_employee").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_leave_requests_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("idx_leave_requests_year").using("btree", table.leaveYear.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.approvedBy],
			foreignColumns: [users.id],
			name: "leave_requests_approved_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.cancelledBy],
			foreignColumns: [users.id],
			name: "leave_requests_cancelled_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "leave_requests_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.requestedBy],
			foreignColumns: [users.id],
			name: "leave_requests_requested_by_users_id_fk"
		}).onDelete("set null"),
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

export const memberAccessProfiles = pgTable("member_access_profiles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	memberId: varchar("member_id").notNull(),
	biotimeEmployeeId: integer("biotime_employee_id"),
	biotimeEmployeeCode: varchar("biotime_employee_code", { length: 50 }).notNull(),
	biotimeDepartmentId: integer("biotime_department_id").default(1).notNull(),
	authorizedAreaId: integer("authorized_area_id").default(2).notNull(),
	unauthorizedAreaId: integer("unauthorized_area_id").default(1).notNull(),
	currentAreaId: integer("current_area_id"),
	desiredAccessEnabled: boolean("desired_access_enabled").default(false).notNull(),
	accessControlStatus: accessControlStatus("access_control_status").default('not_synced').notNull(),
	biometricEnrollmentStatus: biometricEnrollmentStatus("biometric_enrollment_status").default('pending').notNull(),
	faceEnrolled: boolean("face_enrolled").default(false).notNull(),
	fingerprintEnrolled: boolean("fingerprint_enrolled").default(false).notNull(),
	biotimeResignId: integer("biotime_resign_id"),
	lastSyncedAt: timestamp("last_synced_at", { withTimezone: true, mode: 'string' }),
	lastSyncAttemptAt: timestamp("last_sync_attempt_at", { withTimezone: true, mode: 'string' }),
	lastSyncError: text("last_sync_error"),
	lastSyncPayload: jsonb("last_sync_payload"),
	lastSyncResponse: jsonb("last_sync_response"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_member_access_profiles_status").using("btree", table.accessControlStatus.asc().nullsLast().op("enum_ops")),
	uniqueIndex("uq_member_access_profiles_biotime_employee_code").using("btree", table.biotimeEmployeeCode.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_member_access_profiles_biotime_employee_id").using("btree", table.biotimeEmployeeId.asc().nullsLast().op("int4_ops")),
	uniqueIndex("uq_member_access_profiles_member").using("btree", table.memberId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "member_access_profiles_member_id_members_id_fk"
		}).onDelete("cascade"),
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

export const payees = pgTable("payees", {
	id: varchar().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	isActive: boolean("is_active").default(true).notNull(),
});

export const membershipUpgrades = pgTable("membership_upgrades", {
	id: varchar().primaryKey().notNull(),
	originalPaymentId: varchar("original_payment_id").notNull(),
	upgradePaymentId: varchar("upgrade_payment_id").notNull(),
	memberId: varchar("member_id").notNull(),
	originalPlanId: varchar("original_plan_id").notNull(),
	newPlanId: varchar("new_plan_id").notNull(),
	originalEndDate: date("original_end_date"),
	newEndDate: date("new_end_date"),
	topUpAmount: numeric("top_up_amount", { precision: 18, scale:  2 }).notNull(),
	upgradeDate: date("upgrade_date").notNull(),
	notes: text(),
	createdByUserId: varchar("created_by_user_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	isLateUpgrade: boolean("is_late_upgrade").default(false).notNull(),
	daysAfterExpiry: integer("days_after_expiry"),
	lateUpgradeReason: text("late_upgrade_reason"),
}, (table) => [
	uniqueIndex("uq_membership_upgrades_original_payment_id").using("btree", table.originalPaymentId.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_membership_upgrades_upgrade_payment_id").using("btree", table.upgradePaymentId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdByUserId],
			foreignColumns: [users.id],
			name: "membership_upgrades_created_by_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "membership_upgrades_member_id_members_id_fk"
		}),
	foreignKey({
			columns: [table.newPlanId],
			foreignColumns: [membershipPlans.id],
			name: "membership_upgrades_new_plan_id_membership_plans_id_fk"
		}),
	foreignKey({
			columns: [table.originalPaymentId],
			foreignColumns: [payments.id],
			name: "membership_upgrades_original_payment_id_payments_id_fk"
		}),
	foreignKey({
			columns: [table.originalPlanId],
			foreignColumns: [membershipPlans.id],
			name: "membership_upgrades_original_plan_id_membership_plans_id_fk"
		}),
	foreignKey({
			columns: [table.upgradePaymentId],
			foreignColumns: [payments.id],
			name: "membership_upgrades_upgrade_payment_id_payments_id_fk"
		}),
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
	memberCount: integer("member_count").default(1).notNull(),
	lateUpgradeGraceDays: integer("late_upgrade_grace_days"),
}, (table) => [
	index("idx_membership_plan_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.revenueAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "membership_plans_revenue_account_id_ledger_accounts_id_fk"
		}),
]);

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
	index("idx_member_membership_member_id_status_end_date").using("btree", table.memberId.asc().nullsLast().op("date_ops"), table.status.asc().nullsLast().op("text_ops"), table.endDate.desc().nullsLast().op("text_ops")),
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
			columns: [table.invoiceId],
			foreignColumns: [customerInvoices.id],
			name: "mpesa_stk_requests_invoice_id_customer_invoices_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "mpesa_stk_requests_member_id_members_id_fk"
		}),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "mpesa_stk_requests_payment_id_payments_id_fk"
		}),
]);

export const overtimeRecords = pgTable("overtime_records", {
	id: varchar().primaryKey().notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	payrollPeriodId: varchar("payroll_period_id", { length: 255 }),
	periodMonth: integer("period_month").notNull(),
	periodYear: integer("period_year").notNull(),
	weekdayOvertimeHours: numeric("weekday_overtime_hours", { precision: 6, scale:  2 }).default('0').notNull(),
	weekendOvertimeHours: numeric("weekend_overtime_hours", { precision: 6, scale:  2 }).default('0').notNull(),
	publicHolidayOvertimeHours: numeric("public_holiday_overtime_hours", { precision: 6, scale:  2 }).default('0').notNull(),
	overtimeHourlyRate: numeric("overtime_hourly_rate", { precision: 14, scale:  2 }).default('0').notNull(),
	weekdayOvertimePay: numeric("weekday_overtime_pay", { precision: 14, scale:  2 }).default('0').notNull(),
	weekendOvertimePay: numeric("weekend_overtime_pay", { precision: 14, scale:  2 }).default('0').notNull(),
	publicHolidayOvertimePay: numeric("public_holiday_overtime_pay", { precision: 14, scale:  2 }).default('0').notNull(),
	totalOvertimePay: numeric("total_overtime_pay", { precision: 14, scale:  2 }).default('0').notNull(),
	status: overtimeStatus().default('draft').notNull(),
	approvedBy: varchar("approved_by", { length: 255 }),
	approvedAt: timestamp("approved_at", { withTimezone: true, mode: 'string' }),
	payrollSlipId: varchar("payroll_slip_id", { length: 255 }),
	notes: text(),
	createdBy: varchar("created_by", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_overtime_records_employee_period").using("btree", table.employeeId.asc().nullsLast().op("text_ops"), table.periodYear.asc().nullsLast().op("int4_ops"), table.periodMonth.asc().nullsLast().op("text_ops")),
	index("idx_overtime_records_payroll_slip_id").using("btree", table.payrollSlipId.asc().nullsLast().op("text_ops")),
	index("idx_overtime_records_period_status").using("btree", table.periodYear.asc().nullsLast().op("int4_ops"), table.periodMonth.asc().nullsLast().op("int4_ops"), table.status.asc().nullsLast().op("int4_ops")),
	uniqueIndex("uq_overtime_records_employee_period").using("btree", table.employeeId.asc().nullsLast().op("int4_ops"), table.periodYear.asc().nullsLast().op("int4_ops"), table.periodMonth.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.approvedBy],
			foreignColumns: [users.id],
			name: "overtime_records_approved_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "overtime_records_created_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "overtime_records_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.payrollPeriodId],
			foreignColumns: [payrollPeriods.id],
			name: "overtime_records_payroll_period_id_payroll_periods_id_fk"
		}).onDelete("set null"),
	check("overtime_records_period_month_range", sql`(period_month >= 1) AND (period_month <= 12)`),
	check("overtime_records_period_year_range", sql`(period_year >= 2000) AND (period_year <= 2100)`),
]);

export const paymentApplications = pgTable("payment_applications", {
	id: serial().primaryKey().notNull(),
	paymentId: varchar("payment_id").notNull(),
	invoiceId: varchar("invoice_id").notNull(),
	amountApplied: numeric("amount_applied", { precision: 18, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [customerInvoices.id],
			name: "payment_applications_invoice_id_customer_invoices_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "payment_applications_payment_id_payments_id_fk"
		}).onDelete("cascade"),
]);

export const passwordResetAttempts = pgTable("password_reset_attempts", {
	id: varchar().primaryKey().notNull(),
	userId: text("user_id"),
	identifierHash: text("identifier_hash").notNull(),
	ipAddress: inet("ip_address"),
	userAgent: text("user_agent"),
	matched: boolean().default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("password_reset_attempts_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("password_reset_attempts_identifier_hash_idx").using("btree", table.identifierHash.asc().nullsLast().op("text_ops")),
	index("password_reset_attempts_ip_address_idx").using("btree", table.ipAddress.asc().nullsLast().op("inet_ops")),
	index("password_reset_attempts_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "password_reset_attempts_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const passwordResetChallenges = pgTable("password_reset_challenges", {
	id: varchar().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	identifierHash: text("identifier_hash").notNull(),
	temporaryPasswordHash: text("temporary_password_hash").notNull(),
	encryptedTemporaryPassword: text("encrypted_temporary_password"),
	ipAddress: inet("ip_address"),
	userAgent: text("user_agent"),
	attemptCount: integer("attempt_count").default(0).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	sentAt: timestamp("sent_at", { mode: 'string' }),
	usedAt: timestamp("used_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("password_reset_challenges_expires_at_idx").using("btree", table.expiresAt.asc().nullsLast().op("timestamp_ops")),
	index("password_reset_challenges_identifier_hash_idx").using("btree", table.identifierHash.asc().nullsLast().op("text_ops")),
	index("password_reset_challenges_ip_address_idx").using("btree", table.ipAddress.asc().nullsLast().op("inet_ops")),
	index("password_reset_challenges_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "password_reset_challenges_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const loanRepayments = pgTable("loan_repayments", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	loanId: varchar("loan_id", { length: 255 }).notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	repaymentDate: date("repayment_date").notNull(),
	periodMonth: integer("period_month").notNull(),
	periodYear: integer("period_year").notNull(),
	principalComponent: numeric("principal_component", { precision: 14, scale:  2 }).notNull(),
	interestComponent: numeric("interest_component", { precision: 14, scale:  2 }).default('0').notNull(),
	totalRepayment: numeric("total_repayment", { precision: 14, scale:  2 }).notNull(),
	balanceBefore: numeric("balance_before", { precision: 14, scale:  2 }).notNull(),
	balanceAfter: numeric("balance_after", { precision: 14, scale:  2 }).notNull(),
	isEarlySettlement: boolean("is_early_settlement").default(false).notNull(),
	payrollSlipId: varchar("payroll_slip_id", { length: 255 }),
	journalEntryId: integer("journal_entry_id"),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_loan_repayments_employee_period").using("btree", table.employeeId.asc().nullsLast().op("text_ops"), table.periodYear.asc().nullsLast().op("int4_ops"), table.periodMonth.asc().nullsLast().op("text_ops")),
	index("idx_loan_repayments_loan_id").using("btree", table.loanId.asc().nullsLast().op("text_ops")),
	index("idx_loan_repayments_payroll_slip_id").using("btree", table.payrollSlipId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "loan_repayments_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.journalEntryId],
			foreignColumns: [journalEntries.id],
			name: "loan_repayments_journal_entry_id_journal_entries_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.loanId],
			foreignColumns: [employeeLoans.id],
			name: "loan_repayments_loan_id_employee_loans_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.payrollSlipId],
			foreignColumns: [payrollSlips.id],
			name: "loan_repayments_payroll_slip_id_payroll_slips_id_fk"
		}),
	check("loan_repayments_period_month_range", sql`(period_month >= 1) AND (period_month <= 12)`),
	check("loan_repayments_period_year_range", sql`(period_year >= 2000) AND (period_year <= 2100)`),
]);

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

export const payrollAccountMappings = pgTable("payroll_account_mappings", {
	id: serial().primaryKey().notNull(),
	role: payrollAccountRole().notNull(),
	accountId: integer("account_id").notNull(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_payroll_account_mappings_role").using("btree", table.role.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [ledgerAccounts.id],
			name: "payroll_account_mappings_account_id_ledger_accounts_id_fk"
		}),
	unique("payroll_account_mappings_role_unique").on(table.role),
]);

export const payrollSlips = pgTable("payroll_slips", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	payrollPeriodId: varchar("payroll_period_id", { length: 255 }).notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	salaryStructureId: varchar("salary_structure_id", { length: 255 }).notNull(),
	status: payrollSlipStatus().default('draft').notNull(),
	isProrated: boolean("is_prorated").default(false).notNull(),
	proratedDays: integer("prorated_days"),
	totalWorkingDaysInPeriod: integer("total_working_days_in_period"),
	proratedReason: varchar("prorated_reason", { length: 50 }),
	basicSalary: numeric("basic_salary", { precision: 14, scale:  2 }).default('0').notNull(),
	houseAllowance: numeric("house_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	transportAllowance: numeric("transport_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	commuterAllowance: numeric("commuter_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	mealAllowance: numeric("meal_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	airtimeAllowance: numeric("airtime_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	otherAllowances: numeric("other_allowances", { precision: 14, scale:  2 }).default('0').notNull(),
	overtimePay: numeric("overtime_pay", { precision: 14, scale:  2 }).default('0').notNull(),
	bonuses: numeric({ precision: 14, scale:  2 }).default('0').notNull(),
	grossPay: numeric("gross_pay", { precision: 14, scale:  2 }).default('0').notNull(),
	fullMonthGrossPay: numeric("full_month_gross_pay", { precision: 14, scale:  2 }).default('0').notNull(),
	overtimeRecordId: varchar("overtime_record_id", { length: 255 }),
	weekdayOvertimeHours: numeric("weekday_overtime_hours", { precision: 6, scale:  2 }),
	weekendOvertimeHours: numeric("weekend_overtime_hours", { precision: 6, scale:  2 }),
	publicHolidayOvertimeHours: numeric("public_holiday_overtime_hours", { precision: 6, scale:  2 }),
	unpaidLeaveDays: integer("unpaid_leave_days").default(0).notNull(),
	halfPayLeaveDays: integer("half_pay_leave_days").default(0).notNull(),
	leaveDeductionAmount: numeric("leave_deduction_amount", { precision: 14, scale:  2 }).default('0').notNull(),
	nssfTier1Employee: numeric("nssf_tier_1_employee", { precision: 14, scale:  2 }).default('0').notNull(),
	nssfTier1Employer: numeric("nssf_tier_1_employer", { precision: 14, scale:  2 }).default('0').notNull(),
	nssfTier2Employee: numeric("nssf_tier_2_employee", { precision: 14, scale:  2 }).default('0').notNull(),
	nssfTier2Employer: numeric("nssf_tier_2_employer", { precision: 14, scale:  2 }).default('0').notNull(),
	nssfEmployee: numeric("nssf_employee", { precision: 14, scale:  2 }).default('0').notNull(),
	nssfEmployer: numeric("nssf_employer", { precision: 14, scale:  2 }).default('0').notNull(),
	shifEmployee: numeric("shif_employee", { precision: 14, scale:  2 }).default('0').notNull(),
	shifEmployer: numeric("shif_employer", { precision: 14, scale:  2 }).default('0').notNull(),
	ahlEmployee: numeric("ahl_employee", { precision: 14, scale:  2 }).default('0').notNull(),
	ahlEmployer: numeric("ahl_employer", { precision: 14, scale:  2 }).default('0').notNull(),
	nitaLevy: numeric("nita_levy", { precision: 14, scale:  2 }).default('50').notNull(),
	pensionAllowableDeduction: numeric("pension_allowable_deduction", { precision: 14, scale:  2 }).default('0').notNull(),
	mortgageAllowableDeduction: numeric("mortgage_allowable_deduction", { precision: 14, scale:  2 }).default('0').notNull(),
	postRetirementAllowableDeduction: numeric("post_retirement_allowable_deduction", { precision: 14, scale:  2 }).default('0').notNull(),
	mealAllowanceExempt: numeric("meal_allowance_exempt", { precision: 14, scale:  2 }).default('0').notNull(),
	nonCashBenefitExempt: numeric("non_cash_benefit_exempt", { precision: 14, scale:  2 }).default('0').notNull(),
	taxableIncome: numeric("taxable_income", { precision: 14, scale:  2 }).default('0').notNull(),
	grossTax: numeric("gross_tax", { precision: 14, scale:  2 }).default('0').notNull(),
	personalRelief: numeric("personal_relief", { precision: 14, scale:  2 }).default('0').notNull(),
	insuranceRelief: numeric("insurance_relief", { precision: 14, scale:  2 }).default('0').notNull(),
	netPaye: numeric("net_paye", { precision: 14, scale:  2 }).default('0').notNull(),
	payeBandBreakdown: text("paye_band_breakdown"),
	pensionEmployeeDeduction: numeric("pension_employee_deduction", { precision: 14, scale:  2 }).default('0').notNull(),
	pensionEmployerContribution: numeric("pension_employer_contribution", { precision: 14, scale:  2 }).default('0').notNull(),
	totalEmployerCost: numeric("total_employer_cost", { precision: 14, scale:  2 }).default('0').notNull(),
	totalLoanDeductions: numeric("total_loan_deductions", { precision: 14, scale:  2 }).default('0').notNull(),
	totalAdvanceRecoveries: numeric("total_advance_recoveries", { precision: 14, scale:  2 }).default('0').notNull(),
	totalOtherDeductions: numeric("total_other_deductions", { precision: 14, scale:  2 }).default('0').notNull(),
	helbDeduction: numeric("helb_deduction", { precision: 14, scale:  2 }).default('0').notNull(),
	totalStatutoryDeductions: numeric("total_statutory_deductions", { precision: 14, scale:  2 }).notNull(),
	totalVoluntaryDeductions: numeric("total_voluntary_deductions", { precision: 14, scale:  2 }).notNull(),
	totalDeductions: numeric("total_deductions", { precision: 14, scale:  2 }).notNull(),
	netPay: numeric("net_pay", { precision: 14, scale:  2 }).notNull(),
	twoThirdsCapApplied: boolean("two_thirds_cap_applied").default(false).notNull(),
	twoThirdsCapAmount: numeric("two_thirds_cap_amount", { precision: 14, scale:  2 }),
	notes: text(),
	approvedBy: varchar("approved_by", { length: 255 }),
	approvedAt: timestamp("approved_at", { withTimezone: true, mode: 'string' }),
	cancelledBy: varchar("cancelled_by", { length: 255 }),
	cancelledAt: timestamp("cancelled_at", { withTimezone: true, mode: 'string' }),
	cancellationReason: text("cancellation_reason"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_payroll_slips_employee").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_payroll_slips_overtime_record").using("btree", table.overtimeRecordId.asc().nullsLast().op("text_ops")),
	index("idx_payroll_slips_period").using("btree", table.payrollPeriodId.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_payroll_slips_period_employee").using("btree", table.payrollPeriodId.asc().nullsLast().op("text_ops"), table.employeeId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.approvedBy],
			foreignColumns: [users.id],
			name: "payroll_slips_approved_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.cancelledBy],
			foreignColumns: [users.id],
			name: "payroll_slips_cancelled_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "payroll_slips_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.overtimeRecordId],
			foreignColumns: [overtimeRecords.id],
			name: "payroll_slips_overtime_record_id_overtime_records_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.payrollPeriodId],
			foreignColumns: [payrollPeriods.id],
			name: "payroll_slips_payroll_period_id_payroll_periods_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.salaryStructureId],
			foreignColumns: [salaryStructures.id],
			name: "payroll_slips_salary_structure_id_salary_structures_id_fk"
		}).onDelete("restrict"),
]);

export const payrollDeductions = pgTable("payroll_deductions", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	payrollSlipId: varchar("payroll_slip_id", { length: 255 }).notNull(),
	payrollPeriodId: varchar("payroll_period_id", { length: 255 }).notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	deductionType: payrollDeductionType("deduction_type").notNull(),
	description: varchar({ length: 255 }).notNull(),
	amount: numeric({ precision: 14, scale:  2 }).notNull(),
	loanId: varchar("loan_id", { length: 255 }),
	advanceId: varchar("advance_id", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_payroll_deductions_advance").using("btree", table.advanceId.asc().nullsLast().op("text_ops")),
	index("idx_payroll_deductions_loan").using("btree", table.loanId.asc().nullsLast().op("text_ops")),
	index("idx_payroll_deductions_period_type").using("btree", table.payrollPeriodId.asc().nullsLast().op("text_ops"), table.deductionType.asc().nullsLast().op("enum_ops")),
	index("idx_payroll_deductions_slip").using("btree", table.payrollSlipId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.advanceId],
			foreignColumns: [salaryAdvances.id],
			name: "payroll_deductions_advance_id_salary_advances_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "payroll_deductions_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.loanId],
			foreignColumns: [employeeLoans.id],
			name: "payroll_deductions_loan_id_employee_loans_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.payrollPeriodId],
			foreignColumns: [payrollPeriods.id],
			name: "payroll_deductions_payroll_period_id_payroll_periods_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.payrollSlipId],
			foreignColumns: [payrollSlips.id],
			name: "payroll_deductions_payroll_slip_id_payroll_slips_id_fk"
		}).onDelete("cascade"),
]);

export const payrollPeriodBonuses = pgTable("payroll_period_bonuses", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	payrollPeriodId: varchar("payroll_period_id", { length: 255 }).notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	amount: numeric({ precision: 14, scale:  2 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	notes: text(),
	createdBy: varchar("created_by", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_payroll_period_bonuses_employee").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_payroll_period_bonuses_period").using("btree", table.payrollPeriodId.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_payroll_period_bonuses_period_employee").using("btree", table.payrollPeriodId.asc().nullsLast().op("text_ops"), table.employeeId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "payroll_period_bonuses_created_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "payroll_period_bonuses_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.payrollPeriodId],
			foreignColumns: [payrollPeriods.id],
			name: "payroll_period_bonuses_payroll_period_id_payroll_periods_id_fk"
		}).onDelete("cascade"),
]);

export const payrollPeriodOtherDeductions = pgTable("payroll_period_other_deductions", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	payrollPeriodId: varchar("payroll_period_id", { length: 255 }).notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	deductionType: payrollDeductionType("deduction_type").notNull(),
	description: varchar({ length: 255 }).notNull(),
	amount: numeric({ precision: 14, scale:  2 }).notNull(),
	notes: text(),
	createdBy: varchar("created_by", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_payroll_period_other_deductions_employee").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_payroll_period_other_deductions_period").using("btree", table.payrollPeriodId.asc().nullsLast().op("text_ops")),
	index("idx_payroll_period_other_deductions_type").using("btree", table.deductionType.asc().nullsLast().op("enum_ops")),
	uniqueIndex("uq_payroll_period_other_deductions_period_employee").using("btree", table.payrollPeriodId.asc().nullsLast().op("text_ops"), table.employeeId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "payroll_period_other_deductions_created_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "payroll_period_other_deductions_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.payrollPeriodId],
			foreignColumns: [payrollPeriods.id],
			name: "payroll_period_other_deductions_payroll_period_id_payroll_perio"
		}).onDelete("cascade"),
	check("payroll_period_other_deductions_allowed_types", sql`deduction_type <> ALL (ARRAY['company_loan'::payroll_deduction_type, 'salary_advance'::payroll_deduction_type, 'helb'::payroll_deduction_type])`),
]);

export const publicHolidays = pgTable("public_holidays", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	holidayDate: date("holiday_date").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_public_holidays_date").using("btree", table.holidayDate.asc().nullsLast().op("date_ops")),
	unique("public_holidays_holiday_date_unique").on(table.holidayDate),
]);

export const payrollRemittanceLineItems = pgTable("payroll_remittance_line_items", {
	id: serial().primaryKey().notNull(),
	journalEntryId: integer("journal_entry_id").notNull(),
	payrollPeriodId: varchar("payroll_period_id", { length: 255 }).notNull(),
	remittanceType: payrollRemittanceItemType("remittance_type").notNull(),
	amountRemitted: numeric("amount_remitted", { precision: 14, scale:  2 }).notNull(),
	referenceNumber: varchar("reference_number", { length: 100 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_payroll_remittance_line_items_journal_entry").using("btree", table.journalEntryId.asc().nullsLast().op("int4_ops")),
	index("idx_payroll_remittance_line_items_period_type").using("btree", table.payrollPeriodId.asc().nullsLast().op("text_ops"), table.remittanceType.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.journalEntryId],
			foreignColumns: [journalEntries.id],
			name: "payroll_remittance_line_items_journal_entry_id_journal_entries_"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.payrollPeriodId],
			foreignColumns: [payrollPeriods.id],
			name: "payroll_remittance_line_items_payroll_period_id_payroll_periods"
		}),
]);

export const paymentMembers = pgTable("payment_members", {
	id: varchar().primaryKey().notNull(),
	paymentId: varchar("payment_id").notNull(),
	memberId: varchar("member_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_payment_members_member_id").using("btree", table.memberId.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_payment_members_payment_member").using("btree", table.paymentId.asc().nullsLast().op("text_ops"), table.memberId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "payment_members_member_id_members_id_fk"
		}).onDelete("restrict"),
	foreignKey({
			columns: [table.paymentId],
			foreignColumns: [payments.id],
			name: "payment_members_payment_id_payments_id_fk"
		}).onDelete("cascade"),
]);

export const payrollPeriods = pgTable("payroll_periods", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	periodMonth: integer("period_month").notNull(),
	periodYear: integer("period_year").notNull(),
	periodStart: date("period_start").notNull(),
	periodEnd: date("period_end").notNull(),
	payDate: date("pay_date").notNull(),
	status: payrollPeriodStatus().default('draft').notNull(),
	totalGrossPay: numeric("total_gross_pay", { precision: 14, scale:  2 }),
	totalNetPay: numeric("total_net_pay", { precision: 14, scale:  2 }),
	totalPaye: numeric("total_paye", { precision: 14, scale:  2 }),
	totalNssfEmployee: numeric("total_nssf_employee", { precision: 14, scale:  2 }),
	totalNssfEmployer: numeric("total_nssf_employer", { precision: 14, scale:  2 }),
	totalShifEmployee: numeric("total_shif_employee", { precision: 14, scale:  2 }),
	totalShifEmployer: numeric("total_shif_employer", { precision: 14, scale:  2 }),
	totalAhlEmployee: numeric("total_ahl_employee", { precision: 14, scale:  2 }),
	totalAhlEmployer: numeric("total_ahl_employer", { precision: 14, scale:  2 }),
	totalNita: numeric("total_nita", { precision: 14, scale:  2 }),
	totalLoanDeductions: numeric("total_loan_deductions", { precision: 14, scale:  2 }),
	totalOtherDeductions: numeric("total_other_deductions", { precision: 14, scale:  2 }),
	employeeCount: integer("employee_count"),
	processingStartedAt: timestamp("processing_started_at", { withTimezone: true, mode: 'string' }),
	processingCompletedAt: timestamp("processing_completed_at", { withTimezone: true, mode: 'string' }),
	approvedBy: varchar("approved_by", { length: 255 }),
	approvedAt: timestamp("approved_at", { withTimezone: true, mode: 'string' }),
	paidAt: timestamp("paid_at", { withTimezone: true, mode: 'string' }),
	closedAt: timestamp("closed_at", { withTimezone: true, mode: 'string' }),
	cancelledBy: varchar("cancelled_by", { length: 255 }),
	cancelledAt: timestamp("cancelled_at", { withTimezone: true, mode: 'string' }),
	cancellationReason: text("cancellation_reason"),
	disbursementJournalEntryId: integer("disbursement_journal_entry_id"),
	remittanceJournalEntryId: integer("remittance_journal_entry_id"),
	payrollJournalEntryId: integer("payroll_journal_entry_id"),
	notes: text(),
	createdBy: varchar("created_by", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	totalAdvanceRecoveries: numeric("total_advance_recoveries", { precision: 14, scale:  2 }),
	totalPensionEmployer: numeric("total_pension_employer", { precision: 14, scale:  2 }),
	processingWarnings: text("processing_warnings"),
	skippedEmployees: text("skipped_employees"),
}, (table) => [
	index("idx_payroll_periods_pay_date").using("btree", table.payDate.asc().nullsLast().op("date_ops")),
	index("idx_payroll_periods_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("idx_payroll_periods_year").using("btree", table.periodYear.asc().nullsLast().op("int4_ops")),
	uniqueIndex("uq_payroll_periods_month_year_active").using("btree", table.periodMonth.asc().nullsLast().op("int4_ops"), table.periodYear.asc().nullsLast().op("int4_ops")).where(sql`(status <> 'cancelled'::payroll_period_status)`),
	foreignKey({
			columns: [table.approvedBy],
			foreignColumns: [users.id],
			name: "payroll_periods_approved_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.cancelledBy],
			foreignColumns: [users.id],
			name: "payroll_periods_cancelled_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "payroll_periods_created_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.disbursementJournalEntryId],
			foreignColumns: [journalEntries.id],
			name: "payroll_periods_disbursement_journal_entry_id_journal_entries_i"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.payrollJournalEntryId],
			foreignColumns: [journalEntries.id],
			name: "payroll_periods_payroll_journal_entry_id_journal_entries_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.remittanceJournalEntryId],
			foreignColumns: [journalEntries.id],
			name: "payroll_periods_remittance_journal_entry_id_journal_entries_id_"
		}).onDelete("set null"),
	check("payroll_periods_period_dates_order", sql`period_end >= period_start`),
	check("payroll_periods_period_month_range", sql`(period_month >= 1) AND (period_month <= 12)`),
	check("payroll_periods_period_year_range", sql`(period_year >= 2020) AND (period_year <= 2100)`),
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

export const salaryAdvanceRecoveries = pgTable("salary_advance_recoveries", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	advanceId: varchar("advance_id", { length: 255 }).notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	recoveryDate: date("recovery_date").notNull(),
	periodMonth: integer("period_month").notNull(),
	periodYear: integer("period_year").notNull(),
	recoveryAmount: numeric("recovery_amount", { precision: 14, scale:  2 }).notNull(),
	balanceBefore: numeric("balance_before", { precision: 14, scale:  2 }).notNull(),
	balanceAfter: numeric("balance_after", { precision: 14, scale:  2 }).notNull(),
	isLastRecovery: boolean("is_last_recovery").default(false).notNull(),
	payrollSlipId: varchar("payroll_slip_id", { length: 255 }),
	clearingJournalEntryId: integer("clearing_journal_entry_id"),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_salary_advance_recoveries_advance_id").using("btree", table.advanceId.asc().nullsLast().op("text_ops")),
	index("idx_salary_advance_recoveries_employee_period").using("btree", table.employeeId.asc().nullsLast().op("int4_ops"), table.periodYear.asc().nullsLast().op("text_ops"), table.periodMonth.asc().nullsLast().op("text_ops")),
	index("idx_salary_advance_recoveries_payroll_slip_id").using("btree", table.payrollSlipId.asc().nullsLast().op("text_ops")),
	uniqueIndex("uq_salary_advance_recoveries_advance_period").using("btree", table.advanceId.asc().nullsLast().op("int4_ops"), table.periodYear.asc().nullsLast().op("int4_ops"), table.periodMonth.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.advanceId],
			foreignColumns: [salaryAdvances.id],
			name: "salary_advance_recoveries_advance_id_salary_advances_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.clearingJournalEntryId],
			foreignColumns: [journalEntries.id],
			name: "salary_advance_recoveries_clearing_journal_entry_id_journal_ent"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "salary_advance_recoveries_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.payrollSlipId],
			foreignColumns: [payrollSlips.id],
			name: "salary_advance_recoveries_payroll_slip_id_payroll_slips_id_fk"
		}),
	check("salary_advance_recoveries_period_month_range", sql`(period_month >= 1) AND (period_month <= 12)`),
	check("salary_advance_recoveries_period_year_range", sql`(period_year >= 2020) AND (period_year <= 2100)`),
]);

export const roles = pgTable("roles", {
	id: varchar().primaryKey().notNull(),
	name: varchar({ length: 128 }).notNull(),
	description: varchar({ length: 512 }),
	isSystem: boolean("is_system").default(false).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

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
	numberOfPeriods: integer("number_of_periods").default(1).notNull(),
	voidedAt: timestamp("voided_at", { withTimezone: true, mode: 'string' }),
	voidedByUserId: varchar("voided_by_user_id"),
	voidReason: text("void_reason"),
}, (table) => [
	foreignKey({
			columns: [table.createdByUserId],
			foreignColumns: [users.id],
			name: "payments_created_by_user_id_users_id_fk"
		}),
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
	foreignKey({
			columns: [table.voidedByUserId],
			foreignColumns: [users.id],
			name: "payments_voided_by_user_id_users_id_fk"
		}),
	unique("payments_payment_no_unique").on(table.paymentNo),
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
			columns: [table.billId],
			foreignColumns: [bills.id],
			name: "recurring_bills_schedules_bill_id_bills_id_fk"
		}),
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.id],
			name: "recurring_bills_schedules_vendor_id_vendors_id_fk"
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

export const statutoryRates = pgTable("statutory_rates", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	category: statutoryRateCategory().notNull(),
	label: varchar({ length: 100 }).notNull(),
	effectiveFrom: date("effective_from").notNull(),
	effectiveTo: date("effective_to"),
	lowerBound: numeric("lower_bound", { precision: 14, scale:  2 }),
	upperBound: numeric("upper_bound", { precision: 14, scale:  2 }),
	rate: numeric({ precision: 10, scale:  6 }),
	fixedAmount: numeric("fixed_amount", { precision: 14, scale:  2 }),
	notes: text(),
	createdBy: varchar("created_by", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_statutory_rates_category_effective_from").using("btree", table.category.asc().nullsLast().op("date_ops"), table.effectiveFrom.asc().nullsLast().op("date_ops")),
	index("idx_statutory_rates_category_effective_to").using("btree", table.category.asc().nullsLast().op("enum_ops"), table.effectiveTo.asc().nullsLast().op("date_ops")),
	index("idx_statutory_rates_effective_from").using("btree", table.effectiveFrom.asc().nullsLast().op("date_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "statutory_rates_created_by_users_id_fk"
		}).onDelete("set null"),
	check("statutory_rates_effective_to_after_from", sql`(effective_to IS NULL) OR (effective_to >= effective_from)`),
]);

export const whtCorrectionLines = pgTable("wht_correction_lines", {
	id: serial().primaryKey().notNull(),
	lineNumber: integer("line_number").notNull(),
	correctionId: varchar("correction_id").notNull(),
	billId: varchar("bill_id").notNull(),
	whtRate: numeric("wht_rate", { precision: 5, scale:  2 }).notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
}, (table) => [
	index("idx_wht_correction_lines_bill_id").using("btree", table.billId.asc().nullsLast().op("text_ops")),
	index("idx_wht_correction_lines_correction_id").using("btree", table.correctionId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.billId],
			foreignColumns: [bills.id],
			name: "wht_correction_lines_bill_id_bills_id_fk"
		}),
	foreignKey({
			columns: [table.correctionId],
			foreignColumns: [whtCorrections.id],
			name: "wht_correction_lines_correction_id_wht_corrections_id_fk"
		}).onDelete("cascade"),
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

export const salaryAdvances = pgTable("salary_advances", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	applicationDate: date("application_date").default(sql`CURRENT_DATE`).notNull(),
	requestedAmount: numeric("requested_amount", { precision: 14, scale:  2 }).notNull(),
	reason: text(),
	status: salaryAdvanceStatus().default('pending').notNull(),
	requestedRecoveryMonths: integer("requested_recovery_months").default(1).notNull(),
	approvedBy: varchar("approved_by", { length: 255 }),
	approvedAt: timestamp("approved_at", { withTimezone: true, mode: 'string' }),
	approvedAmount: numeric("approved_amount", { precision: 14, scale:  2 }),
	approvedRecoveryMonths: integer("approved_recovery_months"),
	monthlyRecoveryAmount: numeric("monthly_recovery_amount", { precision: 14, scale:  2 }),
	disbursementAccountId: integer("disbursement_account_id"),
	disbursementDate: date("disbursement_date"),
	disbursementJournalEntryId: integer("disbursement_journal_entry_id"),
	recoveryStartMonth: integer("recovery_start_month"),
	recoveryStartYear: integer("recovery_start_year"),
	rejectedBy: varchar("rejected_by", { length: 255 }),
	rejectedAt: timestamp("rejected_at", { withTimezone: true, mode: 'string' }),
	rejectionReason: text("rejection_reason"),
	cancelledBy: varchar("cancelled_by", { length: 255 }),
	cancelledAt: timestamp("cancelled_at", { withTimezone: true, mode: 'string' }),
	cancellationReason: text("cancellation_reason"),
	outstandingBalance: numeric("outstanding_balance", { precision: 14, scale:  2 }),
	totalRecovered: numeric("total_recovered", { precision: 14, scale:  2 }).default('0').notNull(),
	recoveriesProcessed: integer("recoveries_processed").default(0).notNull(),
	notes: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_salary_advances_disbursement_account_id").using("btree", table.disbursementAccountId.asc().nullsLast().op("int4_ops")),
	index("idx_salary_advances_employee_id").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_salary_advances_employee_status").using("btree", table.employeeId.asc().nullsLast().op("text_ops"), table.status.asc().nullsLast().op("enum_ops")),
	index("idx_salary_advances_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.approvedBy],
			foreignColumns: [users.id],
			name: "salary_advances_approved_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.cancelledBy],
			foreignColumns: [users.id],
			name: "salary_advances_cancelled_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.disbursementAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "salary_advances_disbursement_account_id_ledger_accounts_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.disbursementJournalEntryId],
			foreignColumns: [journalEntries.id],
			name: "salary_advances_disbursement_journal_entry_id_journal_entries_i"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "salary_advances_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.rejectedBy],
			foreignColumns: [users.id],
			name: "salary_advances_rejected_by_users_id_fk"
		}).onDelete("set null"),
	check("salary_advances_approved_recovery_months_range", sql`(approved_recovery_months IS NULL) OR ((approved_recovery_months >= 1) AND (approved_recovery_months <= 3))`),
	check("salary_advances_recovery_start_month_range", sql`(recovery_start_month IS NULL) OR ((recovery_start_month >= 1) AND (recovery_start_month <= 12))`),
	check("salary_advances_recovery_start_year_range", sql`(recovery_start_year IS NULL) OR ((recovery_start_year >= 2020) AND (recovery_start_year <= 2100))`),
	check("salary_advances_requested_recovery_months_range", sql`(requested_recovery_months >= 1) AND (requested_recovery_months <= 3)`),
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
	deleted_at: timestamp("deleted_at"),
	memberId: varchar("member_id", { length: 255 }),
	deactivatedAt: timestamp("deactivated_at", { mode: 'string' }),
	isSystemAdmin: boolean("is_system_admin").default(false).notNull(),
}, (table) => [
	index("users_contact_idx").using("btree", table.contact.asc().nullsLast().op("text_ops")),
	index("users_name_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	unique("users_username_unique").on(table.username),
	unique("users_member_id_unique").on(table.memberId),
]);

export const salaryStructures = pgTable("salary_structures", {
	id: varchar().primaryKey().notNull(),
	employeeId: varchar("employee_id", { length: 255 }).notNull(),
	effectiveFrom: date("effective_from").notNull(),
	effectiveTo: date("effective_to"),
	payFrequency: payFrequency("pay_frequency").default('monthly').notNull(),
	basicSalary: numeric("basic_salary", { precision: 14, scale:  2 }).notNull(),
	houseAllowance: numeric("house_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	transportAllowance: numeric("transport_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	commuterAllowance: numeric("commuter_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	mealAllowance: numeric("meal_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	airtimeAllowance: numeric("airtime_allowance", { precision: 14, scale:  2 }).default('0').notNull(),
	otherAllowances: numeric("other_allowances", { precision: 14, scale:  2 }).default('0').notNull(),
	otherAllowancesDescription: varchar("other_allowances_description", { length: 255 }),
	pensionEmployeeContribution: numeric("pension_employee_contribution", { precision: 14, scale:  2 }).default('0').notNull(),
	pensionEmployerContribution: numeric("pension_employer_contribution", { precision: 14, scale:  2 }).default('0').notNull(),
	pensionFundName: varchar("pension_fund_name", { length: 100 }),
	mortgageInterestMonthly: numeric("mortgage_interest_monthly", { precision: 14, scale:  2 }).default('0').notNull(),
	postRetirementMedicalMonthly: numeric("post_retirement_medical_monthly", { precision: 14, scale:  2 }).default('0').notNull(),
	insurancePremiumsMonthly: numeric("insurance_premiums_monthly", { precision: 14, scale:  2 }).default('0').notNull(),
	hasHelbLoan: boolean("has_helb_loan").default(false).notNull(),
	helbMonthlyDeduction: numeric("helb_monthly_deduction", { precision: 14, scale:  2 }).default('0').notNull(),
	normalHoursPerDay: numeric("normal_hours_per_day", { precision: 4, scale:  2 }).default('8').notNull(),
	normalDaysPerWeek: numeric("normal_days_per_week", { precision: 4, scale:  2 }).default('5').notNull(),
	overtimeHourlyRateDivisor: integer("overtime_hourly_rate_divisor").default(225).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	notes: text(),
	createdBy: varchar("created_by", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_salary_structures_employee").using("btree", table.employeeId.asc().nullsLast().op("text_ops")),
	index("idx_salary_structures_employee_active").using("btree", table.employeeId.asc().nullsLast().op("text_ops"), table.isActive.asc().nullsLast().op("text_ops")),
	index("idx_salary_structures_employee_effective_from").using("btree", table.employeeId.asc().nullsLast().op("text_ops"), table.effectiveFrom.asc().nullsLast().op("date_ops")),
	index("idx_salary_structures_employee_effective_to").using("btree", table.employeeId.asc().nullsLast().op("date_ops"), table.effectiveTo.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "salary_structures_created_by_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "salary_structures_employee_id_employees_id_fk"
		}).onDelete("cascade"),
	check("salary_structures_effective_to_after_from", sql`(effective_to IS NULL) OR (effective_to > effective_from)`),
]);

export const whtRemittances = pgTable("wht_remittances", {
	id: varchar().primaryKey().notNull(),
	remittanceNo: integer("remittance_no").notNull(),
	remittanceDate: date("remittance_date").notNull(),
	reference: varchar(),
	bankId: varchar("bank_id"),
	creditingAccountId: integer("crediting_account_id"),
	memo: text(),
	createdBy: varchar("created_by").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_wht_remittances_reference").using("btree", table.reference.asc().nullsLast().op("text_ops")),
	index("idx_wht_remittances_remittance_date").using("btree", table.remittanceDate.asc().nullsLast().op("date_ops")),
	index("idx_wht_remittances_remittance_no").using("btree", table.remittanceNo.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.bankId],
			foreignColumns: [bankAccounts.id],
			name: "wht_remittances_bank_id_bank_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "wht_remittances_created_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.creditingAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "wht_remittances_crediting_account_id_ledger_accounts_id_fk"
		}),
]);

export const whtRemittanceLines = pgTable("wht_remittance_lines", {
	id: serial().primaryKey().notNull(),
	lineNumber: integer("line_number").notNull(),
	remittanceId: varchar("remittance_id").notNull(),
	billId: varchar("bill_id").notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	currentBalance: numeric("current_balance", { precision: 10, scale:  2 }).default('0').notNull(),
	dc: lineDc().notNull(),
}, (table) => [
	index("idx_wht_remittance_lines_bill_id").using("btree", table.billId.asc().nullsLast().op("text_ops")),
	index("idx_wht_remittance_lines_bill_id_dc").using("btree", table.billId.asc().nullsLast().op("text_ops"), table.dc.asc().nullsLast().op("text_ops")),
	index("idx_wht_remittance_lines_remittance_id").using("btree", table.remittanceId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.billId],
			foreignColumns: [bills.id],
			name: "wht_remittance_lines_bill_id_bills_id_fk"
		}),
	foreignKey({
			columns: [table.remittanceId],
			foreignColumns: [whtRemittances.id],
			name: "wht_remittance_lines_remittance_id_wht_remittances_id_fk"
		}).onDelete("cascade"),
]);

export const accessControlSyncAttempts = pgTable("access_control_sync_attempts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	jobId: uuid("job_id").notNull(),
	success: boolean().notNull(),
	requestPayload: jsonb("request_payload"),
	responsePayload: jsonb("response_payload"),
	errorMessage: text("error_message"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_access_sync_attempts_job").using("btree", table.jobId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.jobId],
			foreignColumns: [accessControlSyncJobs.id],
			name: "access_control_sync_attempts_job_id_access_control_sync_jobs_id"
		}).onDelete("cascade"),
]);

export const employees = pgTable("employees", {
	id: varchar().primaryKey().notNull(),
	employeeNo: varchar("employee_no", { length: 20 }).notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	gender: gender().notNull(),
	nationalId: varchar("national_id", { length: 20 }),
	dateOfBirth: date("date_of_birth"),
	kraPin: varchar("kra_pin", { length: 20 }),
	nssfNo: varchar("nssf_no", { length: 30 }),
	shifNo: varchar("shif_no", { length: 30 }),
	helbRef: varchar("helb_ref", { length: 30 }),
	phone: varchar({ length: 20 }).notNull(),
	email: varchar({ length: 255 }),
	emergencyContact: varchar("emergency_contact", { length: 20 }),
	nextOfKin: varchar("next_of_kin", { length: 20 }),
	jobTitle: varchar("job_title", { length: 150 }),
	departmentId: integer("department_id"),
	employmentType: employmentType("employment_type").default('full_time').notNull(),
	status: employmentStatus().default('active').notNull(),
	hireDate: date("hire_date"),
	terminationDate: date("termination_date"),
	bankName: varchar("bank_name", { length: 100 }),
	bankAccountNo: varchar("bank_account_no", { length: 30 }),
	bankBranch: varchar("bank_branch", { length: 100 }),
	isResident: boolean("is_resident").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	index("idx_employees_email").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("idx_employees_phone").using("btree", table.phone.asc().nullsLast().op("text_ops")),
	index("idx_first_name_last_name").using("btree", table.firstName.asc().nullsLast().op("text_ops"), table.lastName.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.departmentId],
			foreignColumns: [departments.id],
			name: "employees_department_id_departments_id_fk"
		}),
	unique("employees_employee_no_unique").on(table.employeeNo),
	unique("employees_national_id_unique").on(table.nationalId),
	unique("employees_kra_pin_unique").on(table.kraPin),
	unique("employees_nssf_no_unique").on(table.nssfNo),
	unique("employees_shif_no_unique").on(table.shifNo),
	unique("employees_helb_ref_unique").on(table.helbRef),
	unique("employees_phone_unique").on(table.phone),
	unique("employees_email_unique").on(table.email),
]);

export const members = pgTable("members", {
	id: varchar().primaryKey().notNull(),
	memberNo: integer("member_no").default(0).notNull(),
	firstName: varchar("first_name").notNull(),
	lastName: varchar("last_name").notNull(),
	dateOfBirth: date("date_of_birth"),
	gender: gender().default('unspecified').notNull(),
	email: varchar(),
	contact: varchar({ length: 15 }).notNull(),
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
	whtApplicable: boolean("wht_applicable").default(false).notNull(),
	whtCategory: whtCategory("wht_category"),
	whtRate: numeric("wht_rate", { precision: 5, scale:  2 }),
	whtAmount: numeric("wht_amount", { precision: 10, scale:  2 }).default('0').notNull(),
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
			columns: [table.membershipId],
			foreignColumns: [memberMemberships.id],
			name: "customer_invoice_lines_membership_id_member_memberships_id_fk"
		}),
	foreignKey({
			columns: [table.planId],
			foreignColumns: [membershipPlans.id],
			name: "customer_invoice_lines_plan_id_membership_plans_id_fk"
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

export const whtCorrections = pgTable("wht_corrections", {
	id: varchar().primaryKey().notNull(),
	correctionNo: integer("correction_no").notNull(),
	correctionDate: date("correction_date").notNull(),
	remittanceStatus: whtCorrectionStatus("remittance_status").notNull(),
	remittanceDate: date("remittance_date"),
	bankId: varchar("bank_id"),
	creditingAccountId: integer("crediting_account_id"),
	memo: text(),
	createdBy: varchar("created_by").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_wht_corrections_correction_date").using("btree", table.correctionDate.asc().nullsLast().op("date_ops")),
	index("idx_wht_corrections_correction_no").using("btree", table.correctionNo.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.bankId],
			foreignColumns: [bankAccounts.id],
			name: "wht_corrections_bank_id_bank_accounts_id_fk"
		}),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "wht_corrections_created_by_users_id_fk"
		}),
	foreignKey({
			columns: [table.creditingAccountId],
			foreignColumns: [ledgerAccounts.id],
			name: "wht_corrections_crediting_account_id_ledger_accounts_id_fk"
		}),
]);

export const twoFactors = pgTable("two_factors", {
	id: varchar().primaryKey().notNull(),
	secret: text().notNull(),
	backupCodes: text("backup_codes").notNull(),
	userId: text("user_id").notNull(),
	verified: boolean().default(true),
	failedVerificationCount: integer("failed_verification_count").default(0),
	lockedUntil: timestamp("locked_until", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "two_factors_user_id_users_id_fk"
		}).onDelete("cascade"),
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
export const vwAttendanceDetails = pgView("vw_attendance_details", {	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	memberName: text("member_name"),
	image: varchar({ length: 255 }),
	checkInTime: timestamp("check_in_time", { withTimezone: true, mode: 'string' }),
	checkOutTime: timestamp("check_out_time", { withTimezone: true, mode: 'string' }),
	duration: numeric(),
	activePlanName: varchar("active_plan_name"),
	nextRenewalDate: date("next_renewal_date"),
}).as(sql`SELECT al.id, (m.first_name::text || ' '::text) || m.last_name::text AS member_name, m.image, al.check_in_time, al.check_out_time, round(EXTRACT(epoch FROM al.check_out_time - al.check_in_time) / 60.0, 2) AS duration, am.plan_name AS active_plan_name, am.end_date AS next_renewal_date FROM attendance_logs al JOIN members m ON al.member_id::text = m.id::text LEFT JOIN LATERAL ( SELECT mp.name AS plan_name, mm.end_date FROM member_memberships mm JOIN membership_plans mp ON mp.id::text = mm.membership_plan_id::text WHERE mm.member_id::text = m.id::text AND mm.status = 'active'::membership_status AND mm.start_date <= CURRENT_DATE AND mm.end_date >= CURRENT_DATE ORDER BY mm.end_date DESC LIMIT 1) am ON true`);

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
	whtAmount: numeric("wht_amount", { precision: 10, scale:  2 }),
	netPayable: numeric("net_payable"),
	totalPayment: numeric("total_payment"),
	balance: numeric(),
	status: billStatus(),
	isOverdue: boolean("is_overdue"),
	isPayable: boolean("is_payable"),
	displayStatus: billStatus("display_status"),
}).as(sql`SELECT b.id, b.invoice_date, b.due_date, b.vendor_id, b.invoice_no, v.name, b.total, b.wht_amount, b.total - COALESCE(b.wht_amount, 0::numeric) - COALESCE(wc.amount, 0::numeric) AS net_payable, COALESCE(sum(bpl.amount), 0::numeric) AS total_payment, b.total - COALESCE(b.wht_amount, 0::numeric) - COALESCE(wc.amount, 0::numeric) - COALESCE(sum(bpl.amount), 0::numeric) AS balance, b.status, b.due_date IS NOT NULL AND b.due_date < CURRENT_DATE AND (b.total - COALESCE(b.wht_amount, 0::numeric) - COALESCE(wc.amount, 0::numeric) - COALESCE(sum(bpl.amount), 0::numeric)) > 0::numeric AND (b.status <> ALL (ARRAY['draft'::bill_status, 'cancelled'::bill_status])) AS is_overdue, b.status <> ALL (ARRAY['draft'::bill_status, 'cancelled'::bill_status]) AS is_payable, CASE WHEN b.status = ANY (ARRAY['draft'::bill_status, 'cancelled'::bill_status]) THEN b.status WHEN (b.total - COALESCE(b.wht_amount, 0::numeric) - COALESCE(wc.amount, 0::numeric) - COALESCE(sum(bpl.amount), 0::numeric)) <= 0::numeric THEN 'paid'::bill_status WHEN b.due_date IS NOT NULL AND b.due_date < CURRENT_DATE THEN 'overdue'::bill_status WHEN COALESCE(sum(bpl.amount), 0::numeric) > 0::numeric THEN 'partially-paid'::bill_status ELSE b.status END AS display_status FROM bills b JOIN vendors v ON b.vendor_id::text = v.id::text LEFT JOIN bill_payment_lines bpl ON bpl.bill_id::text = b.id::text AND bpl.dc = 'credit'::line_dc LEFT JOIN ( SELECT wht_correction_lines.bill_id, sum(wht_correction_lines.amount) AS amount FROM wht_correction_lines GROUP BY wht_correction_lines.bill_id) wc ON wc.bill_id::text = b.id::text GROUP BY b.id, b.invoice_date, b.due_date, b.invoice_no, v.name, b.total, b.wht_amount, wc.amount ORDER BY b.invoice_date DESC, b.invoice_no DESC`);

export const vwWhtBalances = pgView("vw_wht_balances", {	id: varchar(),
	invoiceDate: date("invoice_date"),
	invoiceNo: varchar("invoice_no"),
	vendorId: varchar("vendor_id"),
	name: varchar(),
	taxPin: varchar("tax_pin"),
	total: numeric({ precision: 10, scale:  2 }),
	whtAmount: numeric("wht_amount", { precision: 10, scale:  2 }),
	pendingCorrectionAmount: numeric("pending_correction_amount"),
	remittedAmount: numeric("remitted_amount"),
	whtBalance: numeric("wht_balance"),
	whtCertificateNo: varchar("wht_certificate_no"),
	whtCertificateIssuedDate: date("wht_certificate_issued_date"),
}).as(sql`SELECT b.id, b.invoice_date, b.invoice_no, b.vendor_id, v.name, v.tax_pin, b.total, b.wht_amount, COALESCE(pc.amount, 0::numeric) AS pending_correction_amount, COALESCE(sum(wrl.amount), 0::numeric) AS remitted_amount, b.wht_amount + COALESCE(pc.amount, 0::numeric) - COALESCE(sum(wrl.amount), 0::numeric) AS wht_balance, b.wht_certificate_no, b.wht_certificate_issued_date FROM bills b JOIN vendors v ON b.vendor_id::text = v.id::text LEFT JOIN wht_remittance_lines wrl ON wrl.bill_id::text = b.id::text AND wrl.dc = 'credit'::line_dc LEFT JOIN ( SELECT wcl.bill_id, sum(wcl.amount) AS amount FROM wht_correction_lines wcl JOIN wht_corrections wc ON wc.id::text = wcl.correction_id::text WHERE wc.remittance_status = 'pending'::wht_correction_status GROUP BY wcl.bill_id) pc ON pc.bill_id::text = b.id::text WHERE (b.wht_amount > 0::numeric OR pc.amount > 0::numeric) AND (b.status <> ALL (ARRAY['draft'::bill_status, 'cancelled'::bill_status])) GROUP BY b.id, b.invoice_date, b.invoice_no, b.vendor_id, v.name, v.tax_pin, b.total, b.wht_amount, pc.amount, b.wht_certificate_no, b.wht_certificate_issued_date ORDER BY b.invoice_date DESC, b.invoice_no DESC`);