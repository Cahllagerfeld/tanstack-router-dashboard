import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	type ColumnSizingState,
	type ColumnVisibilityState,
	type RowSelectionState,
	useTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { DataTable } from "@/components/tables/data-table";
import { features } from "@/components/tables/data-table-features";
import { TableToolbar } from "@/components/tables/table-toolbar";
import { pipelineQueries } from "@/data/pipelines";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { Pagination } from "@/features/pagination";
import { usePipelineColumns } from "@/features/pipelines/pipelines-list/columns";
import { m } from "@/paraglide/messages";
import { type PipelineListQueryParams } from "@/types/pipelines";

const querySchema = commonFilterSchema;

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/pipelines"
)({
	validateSearch: querySchema,
	loaderDeps: ({ search: { page, size } }) => ({ page, size }),
	loader: async ({
		context: { queryClient },
		params: { project_id },
		deps: { page, size },
	}) => {
		const queryParams = {
			project: project_id,
			page,
			size,
		} satisfies PipelineListQueryParams;

		await queryClient.ensureQueryData(pipelineQueries.list(queryParams));
		return {
			queryParams,
			crumb: m.pipelines_navigation_label(),
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const columns = usePipelineColumns();
	const { queryParams } = Route.useLoaderData();
	const { data: pipelines } = useSuspenseQuery(
		pipelineQueries.list(queryParams)
	);
	const [columnVisibility, setColumnVisibility] =
		useState<ColumnVisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useTable({
		features,
		data: pipelines.items,
		columns,
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
				<h1 className="text-2xl font-bold">{m.pipelines_list_title()}</h1>
				<p className="text-sm text-muted-foreground">
					{m.pipelines_list_description()}
				</p>
			</div>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<Pagination index={pipelines.index} totalPages={pipelines.total_pages} />
		</div>
	);
}
