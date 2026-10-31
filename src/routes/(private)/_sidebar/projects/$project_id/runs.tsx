import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { runQueries } from "@/data/runs";
import { useRunColumns } from "@/features/runs/ui";
import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";
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
	const table = useDataTable({
		data: runs.items,
		columns,
		defaultColumn: { size: 160, minSize: 120, maxSize: 320 },
	});

	return (
		<TableView title={m.runs_list_title()}>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<TableFooter page={runs} />
		</TableView>
	);
}
