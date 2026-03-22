import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { stackQueries } from "@/data/stacks";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { useStackColumns } from "@/features/stacks/stacks-list/columns";
import { StackTable } from "@/features/stacks/stacks-list/stack-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	ColumnSizingState,
	getCoreRowModel,
	RowSelectionState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

const querySchema = commonFilterSchema;

export const Route = createFileRoute("/(private)/_unscoped/stacks/")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { page, size } }) => ({ page, size }),
	loader: async ({ context: { queryClient }, deps: { page, size } }) => {
		await queryClient.ensureQueryData(
			stackQueries.list({
				page,
				size,
			})
		);
	},
	head: () => ({
		meta: [{ title: "Stacks" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const columns = useStackColumns();
	const { size, page } = Route.useSearch();
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const data = useSuspenseQuery(stackQueries.list({ size, page }));

	const table = useReactTable({
		data: data.data.items,
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

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Stacks</h1>
				<p className="text-muted-foreground text-sm">
					Stacks are collections of components that work together.
				</p>
			</div>
			<div className="flex items-center justify-end gap-2">
				<DataTableViewOptions table={table} />
			</div>
			<StackTable table={table} />
		</div>
	);
}
