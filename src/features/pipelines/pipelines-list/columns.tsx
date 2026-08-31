import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import type { DataTableFeatures } from "@/components/tables/data-table-features";
import type { Pipeline } from "@/domain/pipelines";
import { m } from "@/paraglide/messages";
import type { ColumnDef } from "@tanstack/react-table";

export function usePipelineColumns(): ColumnDef<DataTableFeatures, Pipeline>[] {
	return [
		{
			header: m.pipelines_table_name(),
			accessorKey: "name",
			enableHiding: true,
			cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
			meta: {
				className: "w-[35%]",
			},
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
			meta: {
				className: "w-[45%]",
			},
		},
		{
			id: "created",
			header: m.pipelines_table_created_at(),
			accessorKey: "created",
			enableHiding: true,
			cell: ({ row }) => {
				const created = row.original.created;
				if (!created) return <NotAvailableTag />;
				return <DisplayDate short date={created} />;
			},
			meta: {
				className: "w-[20%]",
			},
		},
	];
}
