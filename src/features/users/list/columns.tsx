import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Checkbox } from "@/components/ui/checkbox";
import { getUsername } from "@/lib/names";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { AdminActions } from "./admin-actions";
import { IsActiveBadge } from "./is-active-badge";
import { Badge } from "@/components/ui/badge";

export function useUserListColumns(isAdmin: boolean): ColumnDef<User>[] {
	return useMemo(() => {
		const columns: ColumnDef<User>[] = [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && "indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
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
				cell: ({ row }) => {
					const username = getUsername(row.original);
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
				accessorFn: (row) => row.body?.active,
				cell: ({ row }) => {
					const isActive = !!row.original.body?.active;
					return <IsActiveBadge isActive={isActive} />;
				},
			},
			{
				id: "created",
				header: "Created",
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

		return columns;
	}, [isAdmin]);
}

const adminColumns: ColumnDef<User>[] = [
	{
		id: "actions",
		enableSorting: false,
		enableHiding: false,
		cell: () => {
			return <AdminActions />;
		},
	},
];
