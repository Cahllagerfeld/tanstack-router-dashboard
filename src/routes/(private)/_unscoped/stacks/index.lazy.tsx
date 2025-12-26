import { DataTable } from "@/components/ui/data-table";
import { stackQueries } from "@/data/stacks";
import { useStackColumns } from "@/features/stacks/stacks-list/columns";
import { StackSearchbar } from "@/features/stacks/stacks-list/searchbar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

export const Route = createLazyFileRoute("/(private)/_unscoped/stacks/")({
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
			<StackSearchbar />
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
