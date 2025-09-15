import { Pagination } from "@/components/pagination";
import { DataTable } from "@/components/ui/data-table";
import { userQueries } from "@/data/user";
import { useUserListColumns } from "@/features/users/list/columns";
import { UserListQueryParams } from "@/types/user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

type Props = {
	queries: UserListQueryParams;
};

export function UserList({ queries }: Props) {
	const { data: userList } = useSuspenseQuery(userQueries.userList(queries));
	const { data: currentUser } = useSuspenseQuery(userQueries.currentUser());
	const columns = useUserListColumns(!!currentUser.body?.is_admin);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	// const hasUsers = userList.total > 0;

	// if (!hasUsers) {
	// 	return <ProjectListNoItemsFallback />;
	// }

	return (
		<div className="space-y-4">
			<DataTable
				getRowId={(row) => row.id}
				data={userList.items}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				columns={columns}
			/>
			{/* <Pagination index={userList.index} totalPages={userList.total_pages} /> */}
		</div>
	);
}
