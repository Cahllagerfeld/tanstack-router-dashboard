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

import { StackActions } from "../delete/stack-actions";
import type { Stack } from "../model";

export function createStackColumns(): ColumnDef<DataTableFeatures, Stack>[] {
	return [
		{
			header: m.stacks_table_name(),
			accessorKey: "name",
			...columnSize.name,
			enableHiding: true,
			cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
		},
		{
			id: "Created by",
			header: m.stacks_table_created_by(),
			accessorFn: (row) => row.creatorName,
			...columnSize.person,
			enableHiding: true,
			cell: ({ row }) => {
				const creatorName = row.original.creatorName;
				if (!creatorName) return <NotAvailableTag />;
				return <p>{creatorName}</p>;
			},
		},
		{
			id: "Created at",
			header: m.stacks_table_created_at(),
			accessorFn: (row) => row.created,
			...columnSize.date,
			enableHiding: true,
			cell: ({ row }) => {
				const date = row.original.created;
				if (!date) return <NotAvailableTag />;
				return <DisplayDate date={date} />;
			},
		},
		actionsColumn((stack) => <StackActions stack={stack} />),
	];
}

// Pre-composed columns for the main stacks list page.
export function useStackColumns(): ColumnDef<DataTableFeatures, Stack>[] {
	return [selectColumn(), ...createStackColumns()];
}
