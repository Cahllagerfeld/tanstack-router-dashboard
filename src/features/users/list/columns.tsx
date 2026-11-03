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
import { Badge } from "@/shared/ui/badge";

import type { User } from "../model";
import { AdminActions } from "./admin-actions";
import { IsActiveBadge } from "./is-active-badge";

export function useUserListColumns(
	isAdmin: boolean
): ColumnDef<DataTableFeatures, User>[] {
	return [
		selectColumn(),
		{
			header: m.users_table_name(),
			accessorKey: "name",
			...columnSize.name,
			enableHiding: true,
			cell: ({ row }) => {
				const username = row.original.name;
				const isAdmin = row.original.isAdmin;
				return (
					<div className="flex items-center gap-2">
						<p>{username}</p>
						{isAdmin && (
							<Badge variant="outline">{m.users_status_admin()}</Badge>
						)}
					</div>
				);
			},
		},
		{
			id: "status",
			header: m.users_table_status(),
			accessorFn: (row) => row.isActive,
			...columnSize.badge,
			enableHiding: true,
			cell: ({ row }) => {
				const isActive = !!row.original.isActive;
				return <IsActiveBadge isActive={isActive} />;
			},
		},
		{
			id: "created",
			header: m.users_table_created(),
			accessorFn: (row) => row.created,
			...columnSize.date,
			enableHiding: true,
			cell: ({ row }) => {
				const date = row.original.created;
				if (!date) return <NotAvailableTag />;
				return <DisplayDate date={date} />;
			},
		},
		...(isAdmin
			? [actionsColumn<User>((user) => <AdminActions user={user} />)]
			: []),
	];
}
