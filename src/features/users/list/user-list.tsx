import { useSuspenseQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { userQueries } from "@/data/user";
import { useUserListColumns } from "@/features/users/list/columns";
import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";
import type { UserListQueryParams } from "@/types/user";

type Props = {
	queries: UserListQueryParams;
	toolbarStart?: ReactNode;
};

export function UserList({ queries, toolbarStart }: Props) {
	const { data: userList } = useSuspenseQuery(userQueries.list(queries));
	const { data: currentUser } = useSuspenseQuery(userQueries.currentUser());
	const columns = useUserListColumns(!!currentUser.isAdmin);
	const table = useDataTable({
		data: userList.items,
		columns,
	});

	return (
		<TableView title={m.settings_members_title()}>
			<TableToolbar>
				{toolbarStart ? (
					<TableToolbar.Start>{toolbarStart}</TableToolbar.Start>
				) : null}
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<TableFooter page={userList} />
		</TableView>
	);
}
