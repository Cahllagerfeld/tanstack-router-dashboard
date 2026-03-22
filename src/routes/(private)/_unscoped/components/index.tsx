import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { componentQueries } from "@/data/components";
import { useComponentColumns } from "@/features/components/components-list/columns";
import { ComponentTable } from "@/features/components/components-list/component-table";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { typeFilterSchema } from "@/features/filters/type";
import { TypeFilter } from "@/features/filters/type-filter";
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

const querySchema = commonFilterSchema.extend({
	type: typeFilterSchema.catch(undefined),
});

export const Route = createFileRoute("/(private)/_unscoped/components/")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { type, page, size } }) => ({ type, page, size }),
	loader: ({ context: { queryClient }, deps: { type, page, size } }) => {
		return queryClient.ensureQueryData(
			componentQueries.list({
				type,
				page,
				size,
			})
		);
	},
	head: () => ({
		meta: [{ title: "Components" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const columns = useComponentColumns();
	const { size, page, type } = Route.useSearch();

	const { data } = useSuspenseQuery(
		componentQueries.list({ size, page, type })
	);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable({
		data: data.items,
		columns: columns,
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
				<h1 className="text-2xl font-bold">Components</h1>
				<p className="text-muted-foreground text-sm">
					Components are the building blocks of your stacks.
				</p>
			</div>
			<div className="flex items-center gap-2">
				<TypeFilter queryName="type" filter={type} />
				<DataTableViewOptions table={table} />
			</div>
			<ComponentTable table={table} />
		</div>
	);
}
