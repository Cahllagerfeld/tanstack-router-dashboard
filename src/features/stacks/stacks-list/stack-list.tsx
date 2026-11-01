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

import { stackQueries } from "../data/queries";
import { useStackColumns } from "./columns";

interface StackListProps {
	page: number | undefined;
	size: number | undefined;
}

export function StackList({ page, size }: StackListProps) {
	const columns = useStackColumns();
	const { data } = useSuspenseQuery(stackQueries.list({ size, page }));

	const table = useDataTable({
		data: data.items,
		columns,
	});

	return (
		<TableView title={m.stacks_list_title()}>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable
				table={table}
				empty={
					<TableEmpty
						icon={getEntityIcon("stack")}
						title={m.stacks_empty_title()}
						description={m.stacks_empty_description()}
					/>
				}
			/>
			<TableFooter page={data} />
		</TableView>
	);
}
