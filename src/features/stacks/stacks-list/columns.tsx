import type { DataTableFeatures } from "@/components/tables/data-table-features";
import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Checkbox } from "@/components/ui/checkbox";
import type { Stack } from "@/domain/stacks";
import type { ColumnDef } from "@tanstack/react-table";

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
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(checked) => row.toggleSelected(checked)}
				aria-label="Select row"
			/>
		),
		enableHiding: false,
	};
}

export function createStackColumns(): ColumnDef<DataTableFeatures, Stack>[] {
	return [
		{
			header: "Name",
			accessorKey: "name",
			enableHiding: true,
			cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
		},
		{
			id: "Created by",
			header: "Created by",
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
			header: "Created at",
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
