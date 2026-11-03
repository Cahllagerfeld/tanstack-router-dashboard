import type { ColumnDef } from "@tanstack/react-table";

import { m } from "@/paraglide/messages";
import DisplayDate from "@/shared/components/display-date";
import { NotAvailableTag } from "@/shared/components/not-available-tag";
import {
	columnSize,
	type DataTableFeatures,
} from "@/shared/components/tables/data-table-features";

import type { Pipeline } from "../model";

export function usePipelineColumns(): ColumnDef<DataTableFeatures, Pipeline>[] {
	return [
		{
			header: m.pipelines_table_name(),
			accessorKey: "name",
			enableHiding: true,
			cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
			...columnSize.name,
		},
		{
			header: m.pipelines_table_description(),
			accessorKey: "description",
			enableHiding: true,
			cell: ({ row }) => {
				const description = row.original.description;
				if (!description) return <NotAvailableTag />;
				return <p>{description}</p>;
			},
			size: 400,
		},
		{
			id: "created",
			header: m.pipelines_table_created_at(),
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
