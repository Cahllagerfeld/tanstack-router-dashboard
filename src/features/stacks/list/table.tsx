import { DataTable } from "@/components/ui/data-table";
import { stackQueries } from "@/data/stacks";
import { useStackListColumns } from "@/features/stacks/list/columns";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

export function StackListTable() {
	const columns = useStackListColumns();
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const { data } = useSuspenseQuery({ ...stackQueries.stackList() });

	return (
		<DataTable
			getRowId={(row) => row.id}
			data={data.items}
			rowSelection={rowSelection}
			setRowSelection={setRowSelection}
			columns={columns}
		/>
	);
}
