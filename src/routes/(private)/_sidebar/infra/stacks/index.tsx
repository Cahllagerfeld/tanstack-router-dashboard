import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { DataTable } from "@/components/tables/data-table";
import { TableFooter } from "@/components/tables/table-footer";
import { TableToolbar } from "@/components/tables/table-toolbar";
import { TableView } from "@/components/tables/table-view";
import { useDataTable } from "@/components/tables/use-data-table";
import { stackQueries } from "@/data/stacks";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { useStackColumns } from "@/features/stacks/stacks-list/columns";
import { m } from "@/paraglide/messages";

const querySchema = commonFilterSchema;

export const Route = createFileRoute("/(private)/_sidebar/infra/stacks/")({
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
		meta: [{ title: m.stacks_list_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const columns = useStackColumns();
	const { size, page } = Route.useSearch();
	const data = useSuspenseQuery(stackQueries.list({ size, page }));

	const table = useDataTable({
		data: data.data.items,
		columns,
	});

	return (
		<TableView title={m.stacks_list_title()}>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<TableFooter page={data.data} />
		</TableView>
	);
}
