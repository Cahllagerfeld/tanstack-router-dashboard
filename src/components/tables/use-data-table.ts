import { type ColumnDef, useTable } from "@tanstack/react-table";

import {
	type DataTableFeatures,
	features,
} from "@/components/tables/data-table-features";

const sharedDefaultColumn = {
	enableHiding: false,
	size: 200,
	minSize: 150,
	maxSize: 400,
};

type DataTableOptions<TData extends { id: string }> = {
	data: TData[];
	columns: ColumnDef<DataTableFeatures, TData>[];
	defaultColumn?: Partial<typeof sharedDefaultColumn>;
};

/** A server-paginated table. Visibility, sizing, and selection stay in the table's own state. */
export function useDataTable<TData extends { id: string }>({
	data,
	columns,
	defaultColumn,
}: DataTableOptions<TData>) {
	return useTable({
		features,
		data,
		columns,
		getRowId: (row) => row.id,
		manualPagination: true,
		columnResizeMode: "onChange",
		enableColumnResizing: true,
		defaultColumn: { ...sharedDefaultColumn, ...defaultColumn },
	});
}
