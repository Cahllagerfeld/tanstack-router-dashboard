import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { stackQueries } from "@/features/stacks";
import { createStackColumns } from "@/features/stacks/ui";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";

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
