import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	type ColumnSizingState,
	type ColumnVisibilityState,
	type RowSelectionState,
	useTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { componentQueries } from "@/data/components";
import { useComponentColumns } from "@/features/components/components-list/columns";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { typeFilterSchema } from "@/features/filters/type";
import { TypeFilter } from "@/features/filters/type-filter";
import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { features } from "@/shared/components/tables/data-table-features";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";

const querySchema = commonFilterSchema.extend({
	type: typeFilterSchema.catch(undefined),
});

export const Route = createFileRoute("/(private)/_sidebar/components/")({
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
		meta: [{ title: m.components_list_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const columns = useComponentColumns();
	const { size, page, type } = Route.useSearch();

	const { data } = useSuspenseQuery(
		componentQueries.list({ size, page, type })
	);

	const [columnVisibility, setColumnVisibility] =
		useState<ColumnVisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useTable({
		features,
		data: data.items,
		columns: columns,
		getRowId: (row) => row.id,
		manualPagination: true,
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
				<h1 className="text-2xl font-bold">{m.components_list_title()}</h1>
				<p className="text-sm text-muted-foreground">
					{m.components_list_description()}
				</p>
			</div>
			<TableToolbar>
				<TableToolbar.Start>
					<TypeFilter queryName="type" filter={type} />
				</TableToolbar.Start>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
		</div>
	);
}
