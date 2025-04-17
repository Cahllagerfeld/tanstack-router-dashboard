import { DataTable } from "@/components/ui/data-table";
import { userQueries } from "@/data/user";
import { useUserListColumns } from "@/features/users/list/columns";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

export const Route = createLazyFileRoute(
	"/(private)/_unscoped/settings/members"
)({
	component: RouteComponent,
});

function RouteComponent() {
	const columns = useUserListColumns();
	const { data } = useSuspenseQuery(userQueries.userList({}));
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Members</h1>
				<p className="text-sm text-muted-foreground">
					Manage your team members and their access to your server.
				</p>
			</div>
			<DataTable
				getRowId={(row) => row.id}
				data={data.items}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				columns={columns}
			/>
		</div>
	);
}
