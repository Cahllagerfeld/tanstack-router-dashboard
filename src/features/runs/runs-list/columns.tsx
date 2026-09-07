import type { ColumnDef } from "@tanstack/react-table";

import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import type { DataTableFeatures } from "@/components/tables/data-table-features";
import { Badge } from "@/components/ui/badge";
import { formatRunIndex, formatRunStatus, type Run } from "@/domain/runs";
import { m } from "@/paraglide/messages";

export function useRunColumns(): ColumnDef<DataTableFeatures, Run>[] {
	return [
		{
			header: m.runs_table_index(),
			accessorKey: "index",
			enableHiding: true,
			cell: ({ row }) => {
				const index = row.original.index;
				if (index === undefined) return <NotAvailableTag />;
				return <p className="font-medium">{formatRunIndex(index)}</p>;
			},
		},
		{
			header: m.runs_table_pipeline(),
			accessorKey: "pipelineName",
			enableHiding: true,
			cell: ({ row }) => row.original.pipelineName || <NotAvailableTag />,
		},
		{
			header: m.runs_table_status(),
			accessorKey: "status",
			enableHiding: true,
			cell: ({ row }) => {
				const status = row.original.status;
				if (!status) return <NotAvailableTag />;
				return <Badge variant="secondary">{formatRunStatus(status)}</Badge>;
			},
		},
		{
			header: m.runs_table_stack(),
			accessorKey: "stackName",
			enableHiding: true,
			cell: ({ row }) => row.original.stackName || <NotAvailableTag />,
		},
		{
			header: m.runs_table_author(),
			accessorKey: "authorName",
			enableHiding: true,
			cell: ({ row }) => row.original.authorName || <NotAvailableTag />,
		},
		{
			header: m.runs_table_created_at(),
			accessorKey: "created",
			enableHiding: true,
			cell: ({ row }) => {
				const created = row.original.created;
				if (!created) return <NotAvailableTag />;
				return <DisplayDate short date={created} />;
			},
		},
	];
}
