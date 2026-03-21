import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/domain/users";
import { ColumnDef } from "@tanstack/react-table";
import { AdminActions } from "./admin-actions";
import { IsActiveBadge } from "./is-active-badge";

export function useUserListColumns(isAdmin: boolean): ColumnDef<User>[] {
	return [
		{
			id: "select",
			meta: {
				className: "w-fit",
			},
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
		},
		{
			header: "Name",
			accessorKey: "name",
			meta: {
				className: "w-full",
			},
			cell: ({ row }) => {
				const username = row.original.name;
				const isAdmin = row.original.isAdmin;
				return (
					<div className="flex items-center gap-2">
						<p>{username}</p>
						{isAdmin && <Badge variant="outline">Admin</Badge>}
					</div>
				);
			},
		},
		{
			header: "Status",
			meta: {
				className: "w-[10%]",
			},
			accessorFn: (row) => row.isActive,
			cell: ({ row }) => {
				const isActive = !!row.original.isActive;
				return <IsActiveBadge isActive={isActive} />;
			},
		},
		{
			id: "created",
			header: "Created",
			meta: {
				className: "w-[10%]",
			},
			accessorFn: (row) => row.created,
			cell: ({ row }) => {
				const date = row.original.created;
				if (!date) return <NotAvailableTag />;
				return <DisplayDate date={date} />;
			},
		},
		...(isAdmin ? adminColumns : []),
	];
}

const adminColumns: ColumnDef<User>[] = [
	{
		id: "actions",
		meta: {
			className: "w-fit",
		},
		enableSorting: false,
		enableHiding: false,
		cell: () => {
			return <AdminActions />;
		},
	},
];
