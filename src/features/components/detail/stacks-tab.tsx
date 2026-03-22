import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { StackTable } from "@/features/stacks/stacks-list/stack-table";
import {
	stackCreatedAtColumn,
	stackCreatedByColumn,
	stackNameColumn,
} from "@/features/stacks/stacks-list/columns";
import { stackQueries } from "@/data/stacks";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	ColumnSizingState,
	getCoreRowModel,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface ComponentStacksTabProps {
	componentId: string;
}

export function ComponentStacksTab({ componentId }: ComponentStacksTabProps) {
	const { data } = useSuspenseQuery(
		stackQueries.list({ component_id: componentId })
	);

	const columns = useMemo(
		() => [stackNameColumn, stackCreatedByColumn, stackCreatedAtColumn],
		[]
	);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

	const table = useReactTable({
		data: data.items,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.id,
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
			<StackTable table={table} />
		</div>
	);
}
