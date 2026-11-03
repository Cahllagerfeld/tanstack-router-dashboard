import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { m } from "@/paraglide/messages";
import DisplayDate from "@/shared/components/display-date";
import { NotAvailableTag } from "@/shared/components/not-available-tag";
import {
	columnSize,
	type DataTableFeatures,
} from "@/shared/components/tables/data-table-features";
import { snakeCaseToTitleCase } from "@/shared/lib/strings";
import { Checkbox } from "@/shared/ui/checkbox";

import { ComponentActions } from "../delete/component-actions";
import type { Component } from "../model";

export function useComponentColumns(): ColumnDef<
	DataTableFeatures,
	Component
>[] {
	return [
		{
			id: "select",
			enableResizing: false,
			...columnSize.select,
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					indeterminate={
						!table.getIsAllPageRowsSelected() &&
						table.getIsSomePageRowsSelected()
					}
					onCheckedChange={(checked) =>
						table.toggleAllPageRowsSelected(checked)
					}
					aria-label={m.common_table_select_all()}
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(checked) => row.toggleSelected(checked)}
					aria-label={m.common_table_select_row()}
				/>
			),
			enableHiding: false,
		},
		{
			header: m.components_table_name(),
			accessorKey: "name",
			enableHiding: true,
			...columnSize.name,
			cell: ({ row }) => (
				<Link
					to="/infra/components/$component_id"
					params={{ component_id: row.original.id }}
					className="text-primary hover:underline"
				>
					{row.original.name}
				</Link>
			),
		},
		{
			header: m.components_table_type(),
			enableHiding: true,
			accessorFn: (row) => row.type,
			size: 160,
			cell: ({ row }) => {
				const type = row.original.type;
				if (!type) return <NotAvailableTag />;
				return <p>{snakeCaseToTitleCase(type)}</p>;
			},
		},
		{
			header: m.components_table_flavor(),
			accessorFn: (row) => row.flavor?.name,
			size: 180,
			enableHiding: true,
			cell: ({ row }) => {
				const logoUrl = row.original.flavor?.logoUrl;
				const flavor = row.original.flavor?.name;
				if (!flavor) return <NotAvailableTag />;
				return (
					<div className="flex items-center gap-2">
						{logoUrl && (
							<img
								src={logoUrl}
								alt={flavor}
								width={24}
								height={24}
								className="shrink-0"
							/>
						)}
						<p>{snakeCaseToTitleCase(flavor)}</p>
					</div>
				);
			},
		},
		{
			header: m.components_table_created_at(),
			enableHiding: true,
			accessorFn: (row) => row.created,
			...columnSize.date,
			cell: ({ row }) => {
				const created = row.original.created;
				if (!created) return <NotAvailableTag />;
				return (
					<p>
						<DisplayDate date={created} />
					</p>
				);
			},
		},
		{
			id: "actions",
			enableResizing: false,
			...columnSize.actions,
			enableHiding: false,
			cell: ({ row }) => <ComponentActions component={row.original} />,
		},
	];
}
