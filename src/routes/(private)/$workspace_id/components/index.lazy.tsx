import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { componentQueries } from "@/data/components";
import { useComponentColumns } from "@/features/components/components-list/columns";
import { TypeFilter } from "@/features/filters/type-filter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { RowSelectionState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
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
			<PageHeader
				headline="Components"
				subHeadline="Components are the building blocks of your stacks"
			/>
			<div className="flex items-center justify-between">
				<TypeFilter queryName="type" filter={type} />
				<Button asChild>
					<Link params={{ workspace_id }} to="/$workspace_id/components/create">
						<Plus />
						Create
					</Link>
				</Button>
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
