import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	type ColumnSizingState,
	type ColumnVisibilityState,
	useTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { DataTable } from "@/components/tables/data-table";
import { features } from "@/components/tables/data-table-features";
import { TableToolbar } from "@/components/tables/table-toolbar";
import { runQueries } from "@/data/runs";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { Pagination } from "@/features/pagination";
import { useRunColumns } from "@/features/runs/runs-list/columns";
import { m } from "@/paraglide/messages";
import type { ProjectRunListQueryParams } from "@/types/runs";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/runs"
)({
	validateSearch: commonFilterSchema,
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
		} satisfies ProjectRunListQueryParams;

		await queryClient.ensureQueryData(runQueries.list(queryParams));
		return {
			queryParams,
			crumb: m.common_navigation_runs(),
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const columns = useRunColumns();
	const { queryParams } = Route.useLoaderData();
	const { data: runs } = useSuspenseQuery(runQueries.list(queryParams));
	const [columnVisibility, setColumnVisibility] =
		useState<ColumnVisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

	const table = useTable({
		features,
		data: runs.items,
		columns,
		getRowId: (row) => row.id,
		manualPagination: true,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnSizingChange: setColumnSizing,
		columnResizeMode: "onChange",
		enableColumnResizing: true,
		defaultColumn: {
			enableHiding: false,
			size: 160,
			minSize: 120,
			maxSize: 320,
		},
		state: {
			columnVisibility,
			columnSizing,
		},
	});

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">{m.runs_list_title()}</h1>
				<p className="text-sm text-muted-foreground">
					{m.runs_list_description()}
				</p>
			</div>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<Pagination index={runs.index} totalPages={runs.total_pages} />
		</div>
	);
}
