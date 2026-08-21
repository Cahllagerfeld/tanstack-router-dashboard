import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { DataTable } from "@/components/tables/data-table";
import { features } from "@/components/tables/data-table-features";
import { createStackColumns } from "@/features/stacks/stacks-list/columns";
import { stackQueries } from "@/data/stacks";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	ColumnSizingState,
	ColumnVisibilityState,
	useTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface ComponentStacksTabProps {
	componentId: string;
}

export function ComponentStacksTab({ componentId }: ComponentStacksTabProps) {
	const { data } = useSuspenseQuery(
		stackQueries.list({ component_id: componentId })
	);

	const columns = useMemo(() => createStackColumns(), []);

	const [columnVisibility, setColumnVisibility] =
		useState<ColumnVisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

	const table = useTable({
		features,
		data: data.items,
		columns,
		getRowId: (row) => row.id,
		manualPagination: true,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnSizingChange: setColumnSizing,
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
		},
	});

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-end gap-2">
				<DataTableViewOptions table={table} />
			</div>
			<DataTable table={table} />
		</div>
	);
}
