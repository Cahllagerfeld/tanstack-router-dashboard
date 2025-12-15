import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Checkbox } from "@/components/ui/checkbox";
import { Stack } from "@/types/stacks";
import { ColumnDef } from "@tanstack/react-table";

export const stackSelectColumn: ColumnDef<Stack> = {
	id: "select",
	header: ({ table }) => (
		<Checkbox
			checked={
				table.getIsAllPageRowsSelected() ||
				(table.getIsSomePageRowsSelected() && "indeterminate")
			}
			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
			aria-label="Select all"
		/>
	),
	cell: ({ row }) => (
		<Checkbox
			checked={row.getIsSelected()}
			onCheckedChange={(value) => row.toggleSelected(!!value)}
			aria-label="Select row"
		/>
	),
	enableSorting: false,
	enableHiding: false,
};

export const stackNameColumn: ColumnDef<Stack> = {
	header: "Name",
	accessorKey: "name",
	cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
	meta: {
		className: "w-1/2",
	},
};

export const stackCreatedByColumn: ColumnDef<Stack> = {
	header: "Created by",
	accessorFn: (row) => row.resources?.user?.name,
	cell: ({ row }) => {
		const userName = row.original.resources?.user?.name;
		if (!userName) return <NotAvailableTag />;
		return <p>{userName}</p>;
	},
	meta: {
		className: "w-[20%]",
	},
};

export const stackCreatedAtColumn: ColumnDef<Stack> = {
	header: "Created at",
	accessorFn: (row) => row.body?.created,
	meta: {
		className: "w-[15%]",
	},
	cell: ({ row }) => {
		const dateString = row.original.body?.created;
		if (!dateString) return <NotAvailableTag />;
		return (
			<p>
				<DisplayDate short dateString={dateString} />
			</p>
		);
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
