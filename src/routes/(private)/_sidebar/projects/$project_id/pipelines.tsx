import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { pipelineQueries } from "@/features/pipelines";
import { usePipelineColumns } from "@/features/pipelines/ui";
import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";

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
		};

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
	const table = useDataTable({
		data: pipelines.items,
		columns,
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
