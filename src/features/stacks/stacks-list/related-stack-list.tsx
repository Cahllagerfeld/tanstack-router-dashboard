import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableEmpty } from "@/shared/components/tables/table-empty";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";
import { getEntityIcon } from "@/shared/lib/entity-icons";

import { stackQueries } from "../data/queries";
import { createStackColumns } from "./columns";

interface RelatedStackListProps {
	componentId: string;
}

export function RelatedStackList({ componentId }: RelatedStackListProps) {
	const { data } = useSuspenseQuery(
		stackQueries.list({ component_id: componentId })
	);

	const columns = useMemo(() => createStackColumns(), []);

	const table = useDataTable({
		data: data.items,
		columns,
	});

	return (
		<TableView>
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
						title={m.stacks_related_empty_title()}
						description={m.stacks_related_empty_description()}
					/>
				}
			/>
		</TableView>
	);
}
