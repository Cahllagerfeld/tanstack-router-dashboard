import { useSuspenseQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { sessionQueries } from "@/features/session";
import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableNoMatches } from "@/shared/components/tables/table-empty";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";

import { userQueries } from "../data/queries";
import { InviteMemberDialog } from "../invite/invite-member-dialog";
import type { UserListInput } from "../model";
import { useUserListColumns } from "./columns";

type Props = {
	queries: UserListInput;
	toolbarStart?: ReactNode;
	/** The current user is always listed, so only a search can empty this list. */
	onClearSearch: () => void;
};

export function UserList({ queries, toolbarStart, onClearSearch }: Props) {
	const { data: userList } = useSuspenseQuery(userQueries.list(queries));
	const { data: identity } = useSuspenseQuery(sessionQueries.currentIdentity());
	const columns = useUserListColumns(!!identity.isAdmin);
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
					{identity.isAdmin ? <InviteMemberDialog /> : null}
				</TableToolbar.End>
			</TableToolbar>
			<DataTable
				table={table}
				empty={<TableNoMatches onClear={onClearSearch} />}
			/>
			<TableFooter page={userList} />
		</TableView>
	);
}
