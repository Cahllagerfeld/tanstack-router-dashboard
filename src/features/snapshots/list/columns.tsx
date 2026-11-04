import type { ColumnDef } from "@tanstack/react-table";

import { m } from "@/paraglide/messages";
import DisplayDate from "@/shared/components/display-date";
import { NotAvailableTag } from "@/shared/components/not-available-tag";
import {
	columnSize,
	type DataTableFeatures,
} from "@/shared/components/tables/data-table-features";

import type { Snapshot } from "../model";

export function useSnapshotColumns(): ColumnDef<DataTableFeatures, Snapshot>[] {
	return [
		{
			header: m.snapshots_table_name(),
			accessorKey: "name",
			enableHiding: true,
			cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
			...columnSize.name,
		},
		{
			header: m.snapshots_table_pipeline(),
			accessorKey: "pipelineName",
			enableHiding: true,
			cell: ({ row }) => row.original.pipelineName || <NotAvailableTag />,
			...columnSize.name,
		},
		{
			header: m.snapshots_table_stack(),
			accessorKey: "stackName",
			enableHiding: true,
			cell: ({ row }) => row.original.stackName || <NotAvailableTag />,
			size: 200,
		},
		{
			header: m.snapshots_table_created_by(),
			accessorKey: "authorName",
			enableHiding: true,
			cell: ({ row }) => row.original.authorName || <NotAvailableTag />,
			...columnSize.person,
		},
		{
			id: "created",
			header: m.snapshots_table_created_at(),
			accessorKey: "created",
			enableHiding: true,
			cell: ({ row }) => {
				const created = row.original.created;
				if (!created) return <NotAvailableTag />;
				return <DisplayDate date={created} />;
			},
			...columnSize.date,
		},
	];
}
