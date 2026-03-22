import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { userQueries } from "@/data/user";
import { Pagination } from "@/features/pagination";
import { useUserListColumns } from "@/features/users/list/columns";
import { UserTable } from "@/features/users/list/user-table";
import { UserListQueryParams } from "@/types/user";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	ColumnSizingState,
	getCoreRowModel,
	RowSelectionState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

type Props = {
	queries: UserListQueryParams;
};

export function UserList({ queries }: Props) {
	const { data: userList } = useSuspenseQuery(userQueries.list(queries));
	const { data: currentUser } = useSuspenseQuery(userQueries.currentUser());
	const columns = useUserListColumns(!!currentUser.isAdmin);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable({
		data: userList.items,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.id,
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
			<div className="flex items-center justify-end gap-2">
				<DataTableViewOptions table={table} />
			</div>
			<UserTable table={table} />
			<Pagination index={userList.index} totalPages={userList.total_pages} />
		</div>
	);
}
