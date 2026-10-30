import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { DataTable } from "@/components/tables/data-table";
import { TableToolbar } from "@/components/tables/table-toolbar";
import { TableView } from "@/components/tables/table-view";
import { useDataTable } from "@/components/tables/use-data-table";
import { stackQueries } from "@/data/stacks";
import { createStackColumns } from "@/features/stacks/stacks-list/columns";

interface ComponentStacksTabProps {
	componentId: string;
}

export function ComponentStacksTab({ componentId }: ComponentStacksTabProps) {
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
			<DataTable table={table} />
		</TableView>
	);
}
