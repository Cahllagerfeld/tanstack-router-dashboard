import type { ReactTable, RowData } from "@tanstack/react-table";
import { type ReactNode, useCallback, useState } from "react";

import type { DataTableFeatures } from "@/shared/components/tables/data-table-features";
import { fitColumnWidths } from "@/shared/components/tables/fit-column-widths";
import { cn } from "@/shared/lib/cn";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

export type DataTableProps<TData extends RowData> = {
	table: ReactTable<DataTableFeatures, TData>;
	/** Replaces the whole table when there are no rows. */
	empty: ReactNode;
};

export function DataTable<TData extends RowData>({
	table,
	empty,
}: DataTableProps<TData>) {
	"use no memo";

	const [tableWidth, measureTable] = useElementWidth();
	const rows = table.getRowModel().rows;
	if (rows.length === 0) return empty;

	const columns = table.getVisibleLeafColumns();
	const fitted = fitColumnWidths(
		columns.map((column) => ({
			size: column.getSize(),
			fixed: !column.getCanResize(),
		})),
		tableWidth
	);
	const widths = new Map(
		columns.map((column, index) => [column.id, `${fitted[index]}px`])
	);

	return (
		<Table ref={measureTable} className="w-full min-w-[800px] table-fixed">
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id} className="bg-secondary">
						{headerGroup.headers.map((header) => (
							<TableHead
								key={header.id}
								className={cn(
									"h-8 truncate text-xs text-muted-foreground first:pl-4 last:pr-4",
									header.column.columnDef.meta?.className,
									header.column.getCanResize() && "relative pr-3"
								)}
								style={{ width: widths.get(header.column.id) }}
							>
								{header.isPlaceholder ? null : (
									<table.FlexRender header={header} />
								)}
								{!header.isPlaceholder && header.column.getCanResize() && (
									<div
										role="separator"
										aria-orientation="vertical"
										className={cn(
											"absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none bg-transparent select-none hover:bg-primary/20",
											header.column.getIsResizing() && "bg-primary/40"
										)}
										onDoubleClick={() => header.column.resetSize()}
										onMouseDown={header.getResizeHandler()}
										onTouchStart={header.getResizeHandler()}
									/>
								)}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow
						key={row.id}
						className="h-12 border-muted"
						data-state={row.getIsSelected() ? "selected" : undefined}
					>
						{row.getVisibleCells().map((cell) => (
							<TableCell
								className={cn(
									"truncate first:pl-4 last:pr-4",
									cell.column.columnDef.meta?.className
								)}
								key={cell.id}
								style={{ width: widths.get(cell.column.id) }}
							>
								<table.FlexRender cell={cell} />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

/** Tracks an element's width. The table mounts only once it has rows. */
function useElementWidth() {
	const [width, setWidth] = useState(0);
	const measure = useCallback((element: HTMLElement | null) => {
		if (!element) return;
		const observer = new ResizeObserver(([entry]) => {
			if (entry) setWidth(entry.borderBoxSize[0]?.inlineSize ?? 0);
		});
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	return [width, measure] as const;
}
