import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Checkbox } from "@/components/ui/checkbox";
import { Stack } from "@/domain/stacks";
import { ColumnDef } from "@tanstack/react-table";

export const stackSelectColumn: ColumnDef<Stack> = {
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
	enableSorting: false,
	enableHiding: false,
};

export const stackNameColumn: ColumnDef<Stack> = {
	header: "Name",
	accessorKey: "name",
	enableHiding: true,
	cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
};

export const stackCreatedByColumn: ColumnDef<Stack> = {
	id: "Created by",
	header: "Created by",
	accessorFn: (row) => row.user?.name,
	enableHiding: true,
	cell: ({ row }) => {
		const userName = row.original.user?.name;
		if (!userName) return <NotAvailableTag />;
		return <p>{userName}</p>;
	},
};

export const stackCreatedAtColumn: ColumnDef<Stack> = {
	id: "Created at",
	header: "Created at",
	accessorFn: (row) => row.created,
	enableHiding: true,
	cell: ({ row }) => {
		const date = row.original.created;
		if (!date) return <NotAvailableTag />;
		return <DisplayDate date={date} />;
	},
};

// Pre-composed hook for the main stacks list page
export function useStackColumns(): ColumnDef<Stack>[] {
	return [
		stackSelectColumn,
		stackNameColumn,
		stackCreatedByColumn,
		stackCreatedAtColumn,
	];
}
