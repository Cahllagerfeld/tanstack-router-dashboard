import { useSuspenseQuery } from "@tanstack/react-query";
import {
	type ColumnSizingState,
	type ColumnVisibilityState,
	type RowSelectionState,
	useTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useState } from "react";

import { userQueries } from "@/data/user";
import { Pagination } from "@/features/pagination";
import { useUserListColumns } from "@/features/users/list/columns";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { features } from "@/shared/components/tables/data-table-features";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
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
		<div className="space-y-4">
			<TableToolbar>
				{toolbarStart ? (
					<TableToolbar.Start>{toolbarStart}</TableToolbar.Start>
				) : null}
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<Pagination index={userList.index} totalPages={userList.total_pages} />
		</div>
	);
}
