import { DataTable } from "@/components/ui/data-table";
import { componentQueries } from "@/data/components";
import { useComponentColumns } from "@/features/components/components-list/columns";
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
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const data = useSuspenseQuery(
		componentQueries.workspaceComponentList(Route.useParams().workspace_id)
	);

	return (
		<div>
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
