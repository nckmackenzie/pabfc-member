import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
	CalendarCheck2Icon,
	DownloadIcon,
	SearchXIcon,
	XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { DateRangePicker } from "@/components/ui/date-ranger-picker";
import { EmptyState } from "@/components/ui/empty";
import { ErrorBoundaryWithSuspense } from "@/components/ui/error-boundary-with-suspense";
import { ErrorComponent } from "@/components/ui/error-component";
import { DatatableSkeleton } from "@/components/ui/loaders";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getCheckIns } from "@/features/check-ins/services/check-ins.api";
import { checkInsValidateSearch } from "@/features/check-ins/services/schema";
import { useFilters } from "@/hooks/use-filters";
import { dateFormat } from "@/lib/helpers";

export const Route = createFileRoute("/(protected)/check-ins/")({
	head: () => ({ meta: [{ title: "Check Ins / PABFC" }] }),
	validateSearch: checkInsValidateSearch,
	component: RouteComponent,
	staticData: {
		breadcrumb: "Check Ins",
	},
	errorComponent: ({ error }) => <ErrorComponent message={error.message} />,
	pendingComponent: () => (
		<div className="space-y-6">
			<PageHeader
				title="Check Ins"
				description="View your gym check-ins and check-outs"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Skeleton className="h-10 lg:col-span-2" />
			</div>
			<DatatableSkeleton />
		</div>
	),
});

function RouteComponent() {
	const { setFilters } = useFilters(Route.id);
	return (
		<div className="space-y-6">
			<PageHeader
				title="Check Ins"
				description="View your gym check-ins and check-outs"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
				<CheckInsTable />
			</ErrorBoundaryWithSuspense>
		</div>
	);
}

type CheckIn = Awaited<ReturnType<typeof getCheckIns>>[number];

const formatDateTime = (value?: string | null) =>
	value ? format(new Date(value), "dd/MM/yyyy HH:mm") : "—";

const columns: Array<ColumnDef<CheckIn>> = [
	{
		accessorKey: "checkInTime",
		header: "Check In",
		cell: ({ row }) => formatDateTime(row.original.checkInTime),
	},
	{
		accessorKey: "checkOutTime",
		header: "Check Out",
		cell: ({ row }) => formatDateTime(row.original.checkOutTime),
	},
	{
		accessorKey: "duration",
		header: "Duration",
		cell: ({ row }) =>
			row.original.duration ? String(row.original.duration) : "—",
	},
];

const escapeCsvValue = (value: string) => {
	if (value.includes('"')) {
		return `"${value.replace(/"/g, '""')}"`;
	}
	if (value.includes(",") || value.includes("\n")) {
		return `"${value}"`;
	}
	return value;
};

const exportCheckInsToExcel = (rows: CheckIn[]) => {
	const headers = ["Check In", "Check Out", "Duration"];

	const dataRows = rows.map((row) => [
		row.checkInTime
			? format(new Date(row.checkInTime), "yyyy-MM-dd HH:mm")
			: "",
		row.checkOutTime
			? format(new Date(row.checkOutTime), "yyyy-MM-dd HH:mm")
			: "",
		row.duration ? String(row.duration) : "",
	]);

	const csvContent = [
		headers.join(","),
		...dataRows.map((row) => row.map(escapeCsvValue).join(",")),
	].join("\n");

	const blob = new Blob([`\uFEFF${csvContent}`], {
		type: "text/csv;charset=utf-8;",
	});
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `check-ins-${dateFormat(new Date())}.csv`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

function CheckInsTable() {
	const { filters, resetFilters } = useFilters(Route.id);
	const hasFilters = !!filters.dateRange?.from || !!filters.dateRange?.to;
	const queryClient = useQueryClient();
	const { data } = useSuspenseQuery({
		queryKey: ["check-ins", filters],
		queryFn: () => getCheckIns({ data: filters }),
	});

	if (data.length === 0) {
		return (
			<EmptyState
				title={hasFilters ? "No check-ins found" : "No check-ins yet"}
				description={
					hasFilters
						? "No visits match the selected date range. Try a different range."
						: "Your visit history will appear here after your first check-in."
				}
				buttonText={hasFilters ? "Clear filters" : "Refresh"}
				buttonVariant={hasFilters ? "outline" : "default"}
				buttonIcon={hasFilters ? <XIcon /> : <CalendarCheck2Icon />}
				buttonAction={
					hasFilters
						? resetFilters
						: () => queryClient.invalidateQueries({ queryKey: ["check-ins"] })
				}
				icon={hasFilters ? <SearchXIcon /> : <CalendarCheck2Icon />}
			/>
		);
	}

	return (
		<div className="space-y-3">
			<div className="flex justify-end">
				<Button variant="outline" onClick={() => exportCheckInsToExcel(data)}>
					<DownloadIcon />
					Export to Excel
				</Button>
			</div>
			<DataTable data={data} columns={columns} />
		</div>
	);
}
