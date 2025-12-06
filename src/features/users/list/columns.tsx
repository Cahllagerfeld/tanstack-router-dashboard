import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/user";
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
		},
		{
			header: "Name",
			accessorKey: "name",
			meta: {
				className: "w-full",
			},
			cell: ({ row }) => {
				const username = row.original.name;
				const isAdmin = row.original.body?.is_admin;
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
			accessorFn: (row) => row.body?.active,
			cell: ({ row }) => {
				const isActive = !!row.original.body?.active;
				return <IsActiveBadge isActive={isActive} />;
			},
		},
		{
			id: "created",
			header: "Created",
			meta: {
				className: "w-[10%]",
			},
			accessorFn: (row) => row.body?.created,
			cell: ({ row }) => {
				const dateString = row.original.body?.created;
				if (!dateString) return <NotAvailableTag />;
				return (
					<p>
						<DisplayDate short dateString={dateString} />
					</p>
				);
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
