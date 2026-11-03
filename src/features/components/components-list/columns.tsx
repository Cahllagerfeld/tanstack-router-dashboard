import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { m } from "@/paraglide/messages";
import DisplayDate from "@/shared/components/display-date";
import { NotAvailableTag } from "@/shared/components/not-available-tag";
import {
	columnSize,
	type DataTableFeatures,
} from "@/shared/components/tables/data-table-features";
import {
	actionsColumn,
	selectColumn,
} from "@/shared/components/tables/edge-columns";
import { snakeCaseToTitleCase } from "@/shared/lib/strings";

import { ComponentActions } from "../delete/component-actions";
import type { Component } from "../model";

export function useComponentColumns(): ColumnDef<
	DataTableFeatures,
	Component
>[] {
	return [
		selectColumn(),
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
		actionsColumn((component) => <ComponentActions component={component} />),
	];
}
