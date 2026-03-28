import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Secret } from "@/domain/secrets";
import { flexRender, type Table as TableType } from "@tanstack/react-table";

type SecretsTableProps = {
	table: TableType<Secret>;
};

export function SecretsTable({ table }: SecretsTableProps) {
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
									className={`truncate ${header.column.getCanResize() ? "relative pr-3" : undefined} `}
									style={{ width: `${header.getSize()}px` }}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									{!header.isPlaceholder && header.column.getCanResize() && (
										<div
											role="separator"
											aria-orientation="vertical"
											className={`hover:bg-primary/20 absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none bg-transparent select-none ${
												header.column.getIsResizing() ? "bg-primary/40" : ""
											}`}
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
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										className="truncate"
										key={cell.id}
										style={{ width: `${cell.column.getSize()}px` }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
