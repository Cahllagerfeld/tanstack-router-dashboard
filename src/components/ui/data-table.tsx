import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	OnChangeFn,
	RowSelectionState,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	rowSelection?: RowSelectionState;
	setRowSelection?: OnChangeFn<RowSelectionState>;
	getRowId?: (row: TData) => string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	rowSelection,
	setRowSelection,
	getRowId,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getRowId,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection: rowSelection || {},
		},
	});

	return (
		<div className="overflow-x-auto rounded-md border">
			<Table className="min-w-[500px]">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										className={cn(
											"truncate",
											header.column.columnDef.meta?.className
										)}
										key={header.id}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								);
							})}
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
										className={cn(
											"truncate",
											cell.column.columnDef.meta?.className
										)}
										key={cell.id}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
