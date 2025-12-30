import { componentQueries } from "@/data/components";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { typeFilterSchema } from "@/features/filters/type";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/ui/data-table";
import { useComponentColumns } from "@/features/components/components-list/columns";
import { TypeFilter } from "@/features/filters/type-filter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RowSelectionState } from "@tanstack/react-table";
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
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const data = useSuspenseQuery(componentQueries.list({ size, page, type }));

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Components</h1>
				<p className="text-muted-foreground text-sm">
					Components are the building blocks of your stacks.
				</p>
			</div>
			<TypeFilter queryName="type" filter={type} />
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
