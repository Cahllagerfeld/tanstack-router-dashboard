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
import { TableFooter } from "@/components/tables/table-footer";
import { TableToolbar } from "@/components/tables/table-toolbar";
import { TableView } from "@/components/tables/table-view";
import { pipelineQueries } from "@/data/pipelines";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
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
		<TableView title={m.pipelines_list_title()}>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<TableFooter page={pipelines} />
		</TableView>
	);
}
