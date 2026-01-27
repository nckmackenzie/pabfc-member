-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."account_type" AS ENUM('asset', 'liability', 'equity', 'revenue', 'expense');--> statement-breakpoint
CREATE TYPE "public"."discount_type" AS ENUM('none', 'amount', 'percentage');--> statement-breakpoint
CREATE TYPE "public"."expense_payment_method" AS ENUM('cash', 'cheque', 'mpesa', 'bank');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'unspecified', 'other');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('draft', 'open', 'partially_paid', 'paid', 'cancelled', 'overdue');--> statement-breakpoint
CREATE TYPE "public"."line_dc" AS ENUM('debit', 'credit');--> statement-breakpoint
CREATE TYPE "public"."member_status" AS ENUM('active', 'inactive', 'frozen', 'terminated');--> statement-breakpoint
CREATE TYPE "public"."membership_status" AS ENUM('active', 'inactive', 'frozen', 'terminated', 'expired', 'pending', 'cancelled', 'suspended', '');--> statement-breakpoint
CREATE TYPE "public"."mpesa_stk_status" AS ENUM('pending', 'success', 'failed', 'timeout', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."normal_balance" AS ENUM('debit', 'credit');--> statement-breakpoint
CREATE TYPE "public"."payment_channel" AS ENUM('portal', 'staff', 'auto_renewal');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('mpesa_stk', 'mpesa_manual', 'cash', 'card', 'bank_transfer');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'completed', 'failed', 'cancelled', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."sms_broadcast_status" AS ENUM('draft', 'sent', 'sending', 'failed');--> statement-breakpoint
CREATE TYPE "public"."sms_filter_criteria" AS ENUM('by status', 'by plan', 'all members', 'specific members');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('admin', 'staff', 'member');--> statement-breakpoint
CREATE TYPE "public"."vat_type" AS ENUM('none', 'inclusive', 'exclusive');--> statement-breakpoint
CREATE TABLE "member_memberships" (
	"id" varchar PRIMARY KEY NOT NULL,
	"member_id" varchar NOT NULL,
	"membership_plan_id" varchar NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"status" "membership_status" DEFAULT 'active' NOT NULL,
	"auto_renew" boolean DEFAULT false NOT NULL,
	"freeze_start_date" date,
	"freeze_end_date" date,
	"freeze_reason" varchar(255),
	"terminated_at" date,
	"terminated_reason" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"price_charged" numeric(10, 2),
	"invoice_id" varchar(255),
	"payment_id" varchar(255),
	"previous_membership_plan_id" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "attendance_logs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"member_id" varchar NOT NULL,
	"check_in_time" timestamp with time zone NOT NULL,
	"check_out_time" timestamp with time zone,
	"source" varchar(30),
	"device_id" varchar(100),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "membership_plans" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"duration" integer NOT NULL,
	"is_session_based" boolean DEFAULT false NOT NULL,
	"session_count" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"valid_from" date,
	"valid_to" date,
	"revenue_account_id" integer
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" varchar PRIMARY KEY NOT NULL,
	"member_no" integer DEFAULT 0 NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"date_of_birth" date,
	"gender" "gender" DEFAULT 'unspecified' NOT NULL,
	"email" varchar,
	"contact" varchar(15),
	"id_type" varchar(20),
	"id_number" varchar(20),
	"member_status" "member_status" DEFAULT 'active' NOT NULL,
	"address" varchar(255),
	"city" varchar(100),
	"state" varchar(100),
	"zip_code" varchar(20),
	"country" varchar(100),
	"emergency_contact_name" varchar(100),
	"emergency_contact_no" varchar(15),
	"emergency_contact_relationship" varchar(100),
	"device_id" varchar(255),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"image" varchar(255),
	"deleted_at" timestamp,
	"deactivated_at" timestamp,
	CONSTRAINT "members_member_no_unique" UNIQUE("member_no"),
	CONSTRAINT "members_email_unique" UNIQUE("email"),
	CONSTRAINT "members_contact_unique" UNIQUE("contact"),
	CONSTRAINT "members_id_number_unique" UNIQUE("id_number")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "two_factors" (
	"id" varchar PRIMARY KEY NOT NULL,
	"secret" text NOT NULL,
	"backup_codes" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"two_factor_enabled" boolean DEFAULT false,
	"role" "user_type" DEFAULT 'staff' NOT NULL,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp,
	"username" text,
	"display_username" text,
	"contact" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"deleted_at" timestamp,
	"member_id" varchar(255),
	"deactivated_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_member_id_unique" UNIQUE("member_id")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" varchar PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" varchar PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_lines" (
	"id" serial PRIMARY KEY NOT NULL,
	"journal_entry_id" integer NOT NULL,
	"account_id" integer NOT NULL,
	"dc" "line_dc" NOT NULL,
	"amount" numeric(18, 2) NOT NULL,
	"memo" text,
	"line_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ledger_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(20),
	"name" varchar(255) NOT NULL,
	"type" "account_type" NOT NULL,
	"normal_balance" "normal_balance" NOT NULL,
	"parent_id" integer,
	"is_posting" boolean DEFAULT true NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ledger_accounts_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "customer_invoices" (
	"id" varchar PRIMARY KEY NOT NULL,
	"invoice_no" varchar(50) NOT NULL,
	"member_id" varchar NOT NULL,
	"issue_date" date NOT NULL,
	"due_date" date NOT NULL,
	"status" "invoice_status" DEFAULT 'open' NOT NULL,
	"currency" varchar(10) DEFAULT 'KES' NOT NULL,
	"subtotal_amount" numeric(18, 2) NOT NULL,
	"tax_amount" numeric(18, 2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(18, 2) NOT NULL,
	"balance_amount" numeric(18, 2) NOT NULL,
	"source" varchar(50),
	"source_id" varchar,
	"channel" "payment_channel",
	"created_by_user_id" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "customer_invoices_invoice_no_unique" UNIQUE("invoice_no")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"resource" varchar(64) NOT NULL,
	"action" varchar(64) NOT NULL,
	"key" varchar(128) NOT NULL,
	"description" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "permissions_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"module" varchar NOT NULL,
	"module_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"menu_order" integer NOT NULL,
	"resource" varchar NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"description" varchar(512),
	"is_system" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "login_attempts" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" text,
	"ip_address" "inet" NOT NULL,
	"user_agent" text,
	"success" boolean NOT NULL,
	"attempted_at" timestamp DEFAULT now(),
	"failure_reason" text
);
--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"action" varchar NOT NULL,
	"ip_address" varchar(45),
	"user_agent" varchar,
	"os" varchar(100),
	"description" varchar NOT NULL,
	"activity_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" varchar PRIMARY KEY NOT NULL,
	"data_privacy" jsonb DEFAULT '{"logRetentionDays":180}'::jsonb,
	"notification" jsonb DEFAULT '{}'::jsonb,
	"security" jsonb DEFAULT '{}'::jsonb,
	"billing" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" text NOT NULL,
	"updated_by" text
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_date" date NOT NULL,
	"reference" varchar(50),
	"description" text,
	"source" varchar(50),
	"source_id" varchar(50),
	"journal_no" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_invoice_lines" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_id" varchar NOT NULL,
	"line_number" integer NOT NULL,
	"description" text NOT NULL,
	"plan_id" varchar,
	"membership_id" varchar,
	"quantity" numeric(18, 2) DEFAULT '1' NOT NULL,
	"unit_price" numeric(18, 2) NOT NULL,
	"line_subtotal" numeric(18, 2) NOT NULL,
	"tax_amount" numeric(18, 2) DEFAULT '0' NOT NULL,
	"line_total" numeric(18, 2) NOT NULL,
	"revenue_account_id" integer NOT NULL,
	"tax_account_id" integer
);
--> statement-breakpoint
CREATE TABLE "payment_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"payment_id" varchar NOT NULL,
	"invoice_id" varchar NOT NULL,
	"amount_applied" numeric(18, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mpesa_stk_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_id" varchar NOT NULL,
	"invoice_id" varchar,
	"payment_id" varchar,
	"phone_number" varchar(20) NOT NULL,
	"amount" numeric(18, 2) NOT NULL,
	"status" "mpesa_stk_status" DEFAULT 'pending' NOT NULL,
	"merchant_request_id" varchar(100),
	"checkout_request_id" varchar(100),
	"raw_request" jsonb,
	"raw_response" jsonb,
	"callback_payload" jsonb,
	"error_code" varchar(50),
	"error_message" varchar(255),
	"initiated_channel" "payment_channel" NOT NULL,
	"initiated_by_user_id" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"callback_received_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" varchar PRIMARY KEY NOT NULL,
	"payment_date" timestamp with time zone DEFAULT now() NOT NULL,
	"member_id" varchar NOT NULL,
	"amount" numeric(18, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'KES' NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"method" "payment_method" NOT NULL,
	"channel" "payment_channel" NOT NULL,
	"reference" varchar(50),
	"external_reference" varchar(100),
	"created_by_user_id" varchar,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"discount_type" "discount_type" DEFAULT 'none' NOT NULL,
	"discount" numeric(18, 2),
	"discount_amount" numeric(18, 2) DEFAULT '0' NOT NULL,
	"tax_amount" numeric(18, 2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(18, 2) NOT NULL,
	"payment_no" varchar(50) NOT NULL,
	"plan_id" varchar,
	"line_total" numeric(18, 2) NOT NULL,
	"vat_type" "vat_type" DEFAULT 'none' NOT NULL,
	CONSTRAINT "payments_payment_no_unique" UNIQUE("payment_no")
);
--> statement-breakpoint
CREATE TABLE "expense_headers" (
	"id" varchar PRIMARY KEY NOT NULL,
	"expense_date" date NOT NULL,
	"expense_no" integer NOT NULL,
	"payee_id" varchar NOT NULL,
	"payment_method" "expense_payment_method" NOT NULL,
	"reference" varchar(50),
	"sub_total" numeric(18, 2) NOT NULL,
	"tax_amount" numeric(18, 2) NOT NULL,
	"total_amount" numeric(18, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'KES' NOT NULL,
	"created_by_user_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_details" (
	"id" varchar PRIMARY KEY NOT NULL,
	"expense_header_id" varchar NOT NULL,
	"line_number" integer NOT NULL,
	"account_id" integer NOT NULL,
	"quantity" numeric(18, 2) DEFAULT '1' NOT NULL,
	"unit_price" numeric(18, 2) NOT NULL,
	"line_subtotal" numeric(18, 2) NOT NULL,
	"vat_type" "vat_type" DEFAULT 'none' NOT NULL,
	"tax_amount" numeric(18, 2) DEFAULT '0' NOT NULL,
	"line_total" numeric(18, 2) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payees" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"expense_header_id" varchar NOT NULL,
	"file_url" varchar NOT NULL,
	"file_name" varchar,
	"file_type" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sms_logs" (
	"id" varchar PRIMARY KEY NOT NULL,
	"template_id" varchar,
	"message" text NOT NULL,
	"receipients" text[] NOT NULL,
	"sent_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sms_templates" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"variables" jsonb DEFAULT '[]'::jsonb,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sms_broadcasts" (
	"id" varchar PRIMARY KEY NOT NULL,
	"filter_criteria" "sms_filter_criteria" NOT NULL,
	"criteria" varchar(255),
	"sms_template_id" varchar,
	"message" text NOT NULL,
	"receipients" text[] NOT NULL,
	"sms_broadcast_status" "sms_broadcast_status" DEFAULT 'draft' NOT NULL,
	"sent_at" timestamp,
	"response" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" varchar(36) NOT NULL,
	"permission_id" varchar(36) NOT NULL,
	CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" varchar(36) NOT NULL,
	"role_id" varchar(36) NOT NULL,
	CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
ALTER TABLE "member_memberships" ADD CONSTRAINT "member_memberships_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_memberships" ADD CONSTRAINT "member_memberships_membership_plan_id_membership_plans_id_fk" FOREIGN KEY ("membership_plan_id") REFERENCES "public"."membership_plans"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_logs" ADD CONSTRAINT "attendance_logs_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "membership_plans" ADD CONSTRAINT "membership_plans_revenue_account_id_ledger_accounts_id_fk" FOREIGN KEY ("revenue_account_id") REFERENCES "public"."ledger_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "two_factors" ADD CONSTRAINT "two_factors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_lines" ADD CONSTRAINT "journal_lines_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_lines" ADD CONSTRAINT "journal_lines_account_id_ledger_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."ledger_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_invoices" ADD CONSTRAINT "customer_invoices_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_attempts" ADD CONSTRAINT "login_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_invoice_lines" ADD CONSTRAINT "customer_invoice_lines_invoice_id_customer_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."customer_invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_invoice_lines" ADD CONSTRAINT "customer_invoice_lines_plan_id_membership_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."membership_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_invoice_lines" ADD CONSTRAINT "customer_invoice_lines_membership_id_member_memberships_id_fk" FOREIGN KEY ("membership_id") REFERENCES "public"."member_memberships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_invoice_lines" ADD CONSTRAINT "customer_invoice_lines_revenue_account_id_ledger_accounts_id_fk" FOREIGN KEY ("revenue_account_id") REFERENCES "public"."ledger_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_invoice_lines" ADD CONSTRAINT "customer_invoice_lines_tax_account_id_ledger_accounts_id_fk" FOREIGN KEY ("tax_account_id") REFERENCES "public"."ledger_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_applications" ADD CONSTRAINT "payment_applications_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_applications" ADD CONSTRAINT "payment_applications_invoice_id_customer_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."customer_invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mpesa_stk_requests" ADD CONSTRAINT "mpesa_stk_requests_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mpesa_stk_requests" ADD CONSTRAINT "mpesa_stk_requests_invoice_id_customer_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."customer_invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mpesa_stk_requests" ADD CONSTRAINT "mpesa_stk_requests_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_plan_id_membership_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."membership_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_headers" ADD CONSTRAINT "expense_headers_payee_id_payees_id_fk" FOREIGN KEY ("payee_id") REFERENCES "public"."payees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_headers" ADD CONSTRAINT "expense_headers_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_details" ADD CONSTRAINT "expense_details_expense_header_id_expense_headers_id_fk" FOREIGN KEY ("expense_header_id") REFERENCES "public"."expense_headers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_details" ADD CONSTRAINT "expense_details_account_id_ledger_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."ledger_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_attachments" ADD CONSTRAINT "expense_attachments_expense_header_id_expense_headers_id_fk" FOREIGN KEY ("expense_header_id") REFERENCES "public"."expense_headers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sms_logs" ADD CONSTRAINT "sms_logs_template_id_sms_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."sms_templates"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sms_broadcasts" ADD CONSTRAINT "sms_broadcasts_sms_template_id_sms_templates_id_fk" FOREIGN KEY ("sms_template_id") REFERENCES "public"."sms_templates"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_member_membership_member_id" ON "member_memberships" USING btree ("member_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_member_membership_membership_plan_id" ON "member_memberships" USING btree ("membership_plan_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_membership_plan_name" ON "membership_plans" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "idx_member_first_name" ON "members" USING btree ("first_name" text_ops);--> statement-breakpoint
CREATE INDEX "idx_member_last_name" ON "members" USING btree ("last_name" text_ops);--> statement-breakpoint
CREATE INDEX "idx_member_status" ON "members" USING btree ("member_status" enum_ops);--> statement-breakpoint
CREATE INDEX "sessions_userId_idx" ON "sessions" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "users_contact_idx" ON "users" USING btree ("contact" text_ops);--> statement-breakpoint
CREATE INDEX "users_name_idx" ON "users" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "verifications_identifier_idx" ON "verifications" USING btree ("identifier" text_ops);--> statement-breakpoint
CREATE INDEX "accounts_userId_idx" ON "accounts" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "idx_accounts_code" ON "ledger_accounts" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX "idx_accounts_name" ON "ledger_accounts" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "login_attempts_attempted_at_idx" ON "login_attempts" USING btree ("attempted_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "login_attempts_ip_address_idx" ON "login_attempts" USING btree ("ip_address" inet_ops);--> statement-breakpoint
CREATE INDEX "login_attempts_user_id_index" ON "login_attempts" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "activity_logs_user_id_idx" ON "activity_logs" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "expense_expense_date_idx" ON "expense_headers" USING btree ("expense_date" date_ops);--> statement-breakpoint
CREATE INDEX "expenses_expense_no_idx" ON "expense_headers" USING btree ("expense_no" int4_ops);--> statement-breakpoint
CREATE INDEX "expenses_reference_idx" ON "expense_headers" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "name" ON "sms_templates" USING btree ("name" text_ops);--> statement-breakpoint
CREATE VIEW "public"."vw_attendance_details" AS (SELECT al.id, (m.first_name::text || ' '::text) || m.last_name::text AS member_name, m.image, al.check_in_time, al.check_out_time, al.check_out_time - al.check_in_time AS duration, am.plan_name AS active_plan_name, am.end_date AS next_renewal_date FROM attendance_logs al JOIN members m ON al.member_id::text = m.id::text LEFT JOIN LATERAL ( SELECT mp.name AS plan_name, mm.end_date FROM member_memberships mm JOIN membership_plans mp ON mp.id::text = mm.membership_plan_id::text WHERE mm.member_id::text = m.id::text AND mm.status = 'active'::membership_status AND mm.start_date <= CURRENT_DATE AND mm.end_date >= CURRENT_DATE ORDER BY mm.end_date DESC LIMIT 1) am ON true);--> statement-breakpoint
CREATE VIEW "public"."vw_member_overview" AS (SELECT m.id, m.member_no, m.first_name, m.last_name, (m.first_name::text || ' '::text) || m.last_name::text AS full_name, m.image, m.contact, m.gender, m.member_status, am.plan_id AS active_plan_id, am.plan_name AS active_plan_name, am.end_date AS next_renewal_date, la.last_visit, m.notes, m.created_at, m.emergency_contact_name, m.emergency_contact_no, ( SELECT users.banned FROM users WHERE users.member_id::text = m.id::text) AS banned FROM members m LEFT JOIN LATERAL ( SELECT mp.id AS plan_id, mp.name AS plan_name, mm.end_date FROM member_memberships mm JOIN membership_plans mp ON mp.id::text = mm.membership_plan_id::text WHERE mm.member_id::text = m.id::text AND mm.status = 'active'::membership_status AND mm.start_date <= CURRENT_DATE AND mm.end_date >= CURRENT_DATE ORDER BY mm.end_date DESC LIMIT 1) am ON true LEFT JOIN LATERAL ( SELECT max(al.check_in_time) AS last_visit FROM attendance_logs al WHERE al.member_id::text = m.id::text) la ON true WHERE m.deleted_at IS NULL);
*/