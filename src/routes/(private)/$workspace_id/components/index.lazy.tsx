import { DataTable } from "@/components/ui/data-table";
import { componentQueries } from "@/data/components";
import { useComponentColumns } from "@/features/components/components-list/columns";
import { TypeFilter } from "@/features/filters/type-filter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

export const Route = createLazyFileRoute(
	"/(private)/$workspace_id/components/"
)({
	component: RouteComponent,
});

function RouteComponent() {
	const columns = useComponentColumns();
	const { workspace_id } = Route.useParams();
	const { size, page, type } = Route.useSearch();
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const data = useSuspenseQuery(
		componentQueries.workspaceComponentList(workspace_id, { size, page, type })
	);

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Components</h1>
				<p className="text-sm text-muted-foreground">
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
