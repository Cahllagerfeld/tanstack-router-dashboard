import { useSuspenseQuery } from "@tanstack/react-query";

import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableEmpty } from "@/shared/components/tables/table-empty";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";
import { getEntityIcon } from "@/shared/lib/entity-icons";

import { secretQueries } from "../data/queries";
import { useSecretColumns } from "./columns";

interface SecretListProps {
	page: number | undefined;
	size: number | undefined;
}

export function SecretList({ page, size }: SecretListProps) {
	const columns = useSecretColumns();

	const { data } = useSuspenseQuery(secretQueries.list({ size, page }));

	const table = useDataTable({
		data: data.items,
		columns,
	});

	return (
		<TableView title={m.secrets_list_title()}>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable
				table={table}
				empty={
					<TableEmpty
						icon={getEntityIcon("secret")}
						title={m.secrets_empty_title()}
						description={m.secrets_empty_description()}
					/>
				}
			/>
			<TableFooter page={data} />
		</TableView>
	);
}
