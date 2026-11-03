import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { m } from "@/paraglide/messages";
import {
	columnSize,
	type DataTableFeatures,
} from "@/shared/components/tables/data-table-features";
import { Checkbox } from "@/shared/ui/checkbox";

/** Row selection, as a table's first column. Fixed width, never resized or hidden. */
export function selectColumn<TData extends RowData>(): ColumnDef<
	DataTableFeatures,
	TData
> {
	return {
		id: "select",
		enableResizing: false,
		enableHiding: false,
		...columnSize.select,
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				indeterminate={
					!table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()
				}
				onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
				aria-label={m.common_table_select_all()}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(checked) => row.toggleSelected(checked)}
				aria-label={m.common_table_select_row()}
			/>
		),
	};
}

/** A row's actions menu, as a table's last column. Fixed width, never resized or hidden. */
export function actionsColumn<TData extends RowData>(
	render: (row: TData) => ReactNode
): ColumnDef<DataTableFeatures, TData> {
	return {
		id: "actions",
		enableResizing: false,
		enableHiding: false,
		...columnSize.actions,
		meta: { className: "text-right" },
		cell: ({ row }) => render(row.original),
	};
}
