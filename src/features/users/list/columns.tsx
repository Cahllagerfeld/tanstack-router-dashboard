import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { IsAdminBadge } from "./is-admin-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { getUsername } from "@/lib/names";

export function useUserListColumns(): ColumnDef<User>[] {
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
					return getUsername(row.original);
				},
			},
			{
				header: "Admin",
				accessorFn: (row) => row.body?.is_admin,
				cell: ({ row }) => {
					const isAdmin = !!row.original.body?.is_admin;
					return <IsAdminBadge isAdmin={isAdmin} />;
				},
			},
		];

		return columns;
	}, []);
}
