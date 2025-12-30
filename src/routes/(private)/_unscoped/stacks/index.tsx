import { stackQueries } from "@/data/stacks";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/ui/data-table";
import { useStackColumns } from "@/features/stacks/stacks-list/columns";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

const querySchema = commonFilterSchema;

export const Route = createFileRoute("/(private)/_unscoped/stacks/")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { page, size } }) => ({ page, size }),
	loader: ({ context: { queryClient }, deps: { page, size } }) => {
		return queryClient.ensureQueryData(
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
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const data = useSuspenseQuery(stackQueries.list({ size, page }));

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Stacks</h1>
				<p className="text-muted-foreground text-sm">
					Stacks are collections of components that work together.
				</p>
			</div>
			<DataTable
				getRowId={(row) => row.id}
				data={data.data.items}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				columns={columns}
			/>
		</div>
	);
}
