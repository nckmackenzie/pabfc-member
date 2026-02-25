import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { PlusIcon, ReceiptText, SearchXIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { DateRangePicker } from "@/components/ui/date-ranger-picker";
import { EmptyState } from "@/components/ui/empty";
import { ErrorBoundaryWithSuspense } from "@/components/ui/error-boundary-with-suspense";
import { ErrorComponent } from "@/components/ui/error-component";
import { DatatableSkeleton } from "@/components/ui/loaders";
import { PageHeader } from "@/components/ui/page-header";
import { Search } from "@/components/ui/search";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddPaymentAction } from "@/features/payments/hooks/use-add-payment";
import { usePaymentsEmptyState } from "@/features/payments/hooks/use-empty-state-props";
import {
	getPayments,
	getPlansAndPhoneNumber,
} from "@/features/payments/services/payments.api";
import { paymentsValidateSearch } from "@/features/payments/services/schema";
import { useFilters } from "@/hooks/use-filters";
import { dateFormat } from "@/lib/helpers";
import { toTitleCase } from "@/lib/utils";

export const Route = createFileRoute("/(protected)/payments/")({
	head: () => ({ meta: [{ title: "Payments / PABFC" }] }),
	validateSearch: paymentsValidateSearch,
	component: RouteComponent,
	staticData: {
		breadcrumb: "Payments",
	},
	loader: async () => {
		const { plans, contact } = await getPlansAndPhoneNumber();
		return { plans, contact };
	},
	errorComponent: ({ error }) => <ErrorComponent message={error.message} />,
	pendingComponent: () => (
		<div className="space-y-6">
			<PageHeader
				title="Payments"
				description="View and manage your payments"
				content={<Skeleton className="h-10 w-56" />}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Skeleton className="h-10 lg:col-span-2" />
				<Skeleton className="h-10" />
			</div>
			<DatatableSkeleton />
		</div>
	),
});

function RouteComponent() {
	const { setFilters, filters } = useFilters(Route.id);
	const { handleAddNewPayment } = useAddPaymentAction();
	return (
		<div className="space-y-6">
			<PageHeader
				title="Payments"
				description="View and manage your payments"
				content={
					<Button variant="default" onClick={handleAddNewPayment}>
						<PlusIcon />
						Make a Payment
					</Button>
				}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Search
					parentClassName="lg:col-span-2"
					className="shadow-xs"
					placeholder="Search payment...."
					defaultValue={filters.search}
					onHandleSearch={(val) => {
						setFilters({ search: val.trim().length > 0 ? val : undefined });
					}}
				/>
				<DateRangePicker
					onUpdate={(values) => {
						setFilters({
							dateRange: {
								from: values.range.from
									? dateFormat(values.range.from)
									: undefined,
								to: values.range.to ? dateFormat(values.range.to) : undefined,
							},
						});
					}}
					align="start"
					locale="en-GB"
					showCompare={false}
				/>
			</div>
			<ErrorBoundaryWithSuspense loader={<DatatableSkeleton />}>
				<PaymentsTable />
			</ErrorBoundaryWithSuspense>
		</div>
	);
}

type Payment = Awaited<ReturnType<typeof getPayments>>[number];

const columns: Array<ColumnDef<Payment>> = [
	{
		accessorKey: "paymentDate",
		header: "Date",
		cell: ({ row }) => dateFormat(row.original.paymentDate, "reporting"),
	},
	{
		accessorKey: "paymentNo",
		header: "Payment No",
		cell: ({ row }) => row.original.paymentNo,
	},
	{
		accessorKey: "reference",
		header: "Reference",
		cell: ({ row }) => row.original.reference,
	},
	{
		accessorKey: "plan",
		header: "Plan",
		cell: ({ row }) => toTitleCase(row.original.plan ?? ""),
	},
	{
		accessorKey: "method",
		header: "Method",
		cell: ({ row }) =>
			toTitleCase(row.original.method.toString().replace("_", " ")),
	},

	{
		accessorKey: "totalAmount",
		header: "Amount",
		cell: ({ row }) => row.original.totalAmount,
	},
];
function PaymentsTable() {
	const { filters, resetFilters } = useFilters(Route.id);
	const { handleAddNewPayment } = useAddPaymentAction();
	const hasFilters =
		!!filters?.search || !!filters.dateRange?.from || !!filters.dateRange?.to;
	const { data } = useSuspenseQuery({
		queryKey: ["payments", filters],
		queryFn: () => getPayments({ data: filters }),
	});

	const obj = usePaymentsEmptyState(
		hasFilters,
		resetFilters,
		handleAddNewPayment,
	);

	if (data.length === 0) {
		return (
			<EmptyState
				{...obj}
				buttonVariant={hasFilters ? "outline" : "default"}
				buttonIcon={!hasFilters ? <PlusIcon /> : <XIcon />}
				icon={!hasFilters ? <ReceiptText /> : <SearchXIcon />}
			/>
		);
	}

	return <DataTable data={data} columns={columns} />;
}
