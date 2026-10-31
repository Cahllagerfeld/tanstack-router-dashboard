import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { stackQueries } from "@/data/stacks";
import { useStackColumns } from "@/features/stacks/ui";
import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";

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
