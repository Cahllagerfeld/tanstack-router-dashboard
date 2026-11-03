import type { ColumnDef } from "@tanstack/react-table";

import { m } from "@/paraglide/messages";
import DisplayDate from "@/shared/components/display-date";
import { NotAvailableTag } from "@/shared/components/not-available-tag";
import {
	columnSize,
	type DataTableFeatures,
} from "@/shared/components/tables/data-table-features";
import { actionsColumn } from "@/shared/components/tables/edge-columns";
import { Badge } from "@/shared/ui/badge";

import { RunActions } from "../delete/run-actions";
import { formatRunIndex, formatRunStatus, type Run } from "../model";

export function useRunColumns(): ColumnDef<DataTableFeatures, Run>[] {
	return [
		{
			header: m.runs_table_index(),
			accessorKey: "index",
			size: 110,
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
			...columnSize.name,
			enableHiding: true,
			cell: ({ row }) => row.original.pipelineName || <NotAvailableTag />,
		},
		{
			header: m.runs_table_status(),
			accessorKey: "status",
			size: 140,
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
			size: 200,
			enableHiding: true,
			cell: ({ row }) => row.original.stackName || <NotAvailableTag />,
		},
		{
			header: m.runs_table_author(),
			accessorKey: "authorName",
			...columnSize.person,
			enableHiding: true,
			cell: ({ row }) => row.original.authorName || <NotAvailableTag />,
		},
		{
			header: m.runs_table_created_at(),
			accessorKey: "created",
			...columnSize.date,
			enableHiding: true,
			cell: ({ row }) => {
				const created = row.original.created;
				if (!created) return <NotAvailableTag />;
				return <DisplayDate date={created} />;
			},
		},
		actionsColumn((run) => <RunActions run={run} />),
	];
}
