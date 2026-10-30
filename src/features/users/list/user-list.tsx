import { useSuspenseQuery } from "@tanstack/react-query";
import {
	type ColumnSizingState,
	type ColumnVisibilityState,
	type RowSelectionState,
	useTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useState } from "react";

import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { DataTable } from "@/components/tables/data-table";
import { features } from "@/components/tables/data-table-features";
import { TableFooter } from "@/components/tables/table-footer";
import { TableToolbar } from "@/components/tables/table-toolbar";
import { TableView } from "@/components/tables/table-view";
import { userQueries } from "@/data/user";
import { useUserListColumns } from "@/features/users/list/columns";
import { m } from "@/paraglide/messages";
import type { UserListQueryParams } from "@/types/user";

type Props = {
	queries: UserListQueryParams;
	toolbarStart?: ReactNode;
};

export function UserList({ queries, toolbarStart }: Props) {
	const { data: userList } = useSuspenseQuery(userQueries.list(queries));
	const { data: currentUser } = useSuspenseQuery(userQueries.currentUser());
	const columns = useUserListColumns(!!currentUser.isAdmin);
	const [columnVisibility, setColumnVisibility] =
		useState<ColumnVisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useTable({
		features,
		data: userList.items,
		columns,
		getRowId: (row) => row.id,
		manualPagination: true,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnSizingChange: setColumnSizing,
		onRowSelectionChange: setRowSelection,
		columnResizeMode: "onChange",
		enableColumnResizing: true,
		defaultColumn: {
			enableHiding: false,
			size: 200,
			minSize: 150,
			maxSize: 400,
		},
		state: {
			columnVisibility,
			columnSizing,
			rowSelection,
		},
	});

	// const hasUsers = userList.total > 0;

	// if (!hasUsers) {
	// 	return <ProjectListNoItemsFallback />;
	// }

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
