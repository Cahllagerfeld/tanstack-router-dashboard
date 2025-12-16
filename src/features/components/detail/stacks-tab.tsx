import { DataTable } from "@/components/ui/data-table";
import { stackQueries } from "@/data/stacks";
import {
	stackNameColumn,
	stackCreatedByColumn,
	stackCreatedAtColumn,
} from "@/features/stacks/stacks-list/columns";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ComponentStacksTabProps {
	componentId: string;
}

export function ComponentStacksTab({ componentId }: ComponentStacksTabProps) {
	const { data } = useSuspenseQuery(
		stackQueries.list({ component_id: componentId })
	);

	const columns = [stackNameColumn, stackCreatedByColumn, stackCreatedAtColumn];

	return (
		<DataTable getRowId={(row) => row.id} data={data.items} columns={columns} />
	);
}
