import type { ColumnDef } from "@tanstack/react-table";

import type { Stack } from "@/domain/stacks";
import { m } from "@/paraglide/messages";
import DisplayDate from "@/shared/components/display-date";
import { NotAvailableTag } from "@/shared/components/not-available-tag";
import type { DataTableFeatures } from "@/shared/components/tables/data-table-features";
import { Checkbox } from "@/shared/components/ui/checkbox";

export function createStackSelectColumn(): ColumnDef<DataTableFeatures, Stack> {
	return {
		id: "select",
		enableResizing: false,
		size: 32,
		minSize: 32,
		maxSize: 32,
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				indeterminate={
					!table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()
				}
				onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
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
	};
}

export function createStackColumns(): ColumnDef<DataTableFeatures, Stack>[] {
	return [
		{
			header: m.stacks_table_name(),
			accessorKey: "name",
			enableHiding: true,
			cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
		},
		{
			id: "Created by",
			header: m.stacks_table_created_by(),
			accessorFn: (row) => row.user?.name,
			enableHiding: true,
			cell: ({ row }) => {
				const userName = row.original.user?.name;
				if (!userName) return <NotAvailableTag />;
				return <p>{userName}</p>;
			},
		},
		{
			id: "Created at",
			header: m.stacks_table_created_at(),
			accessorFn: (row) => row.created,
			enableHiding: true,
			cell: ({ row }) => {
				const date = row.original.created;
				if (!date) return <NotAvailableTag />;
				return <DisplayDate date={date} />;
			},
		},
	];
}

// Pre-composed columns for the main stacks list page.
export function useStackColumns(): ColumnDef<DataTableFeatures, Stack>[] {
	return [createStackSelectColumn(), ...createStackColumns()];
}
