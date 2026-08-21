import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { DataTableFeatures } from "@/components/tables/data-table-features";
import { cn } from "@/lib/utils";
import type { ReactTable, RowData } from "@tanstack/react-table";

export type DataTableProps<TData extends RowData> = {
	table: ReactTable<DataTableFeatures, TData>;
};

export function DataTable<TData extends RowData>({
	table,
}: DataTableProps<TData>) {
	"use no memo";

	return (
		<div className="rounded-md border">
			<Table className="w-full min-w-[800px] table-fixed">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className={cn(
										"truncate",
										header.column.columnDef.meta?.className,
										header.column.getCanResize() && "relative pr-3"
									)}
									style={{ width: `${header.getSize()}px` }}
								>
									{header.isPlaceholder ? null : (
										<table.FlexRender header={header} />
									)}
									{!header.isPlaceholder && header.column.getCanResize() && (
										<div
											role="separator"
											aria-orientation="vertical"
											className={cn(
												"hover:bg-primary/20 absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none bg-transparent select-none",
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
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() ? "selected" : undefined}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										className={cn(
											"truncate",
											cell.column.columnDef.meta?.className
										)}
										key={cell.id}
										style={{ width: `${cell.column.getSize()}px` }}
									>
										<table.FlexRender cell={cell} />
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={table.getAllColumns().length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
