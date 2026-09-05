import type { ReactTable, RowData } from "@tanstack/react-table";
import { Columns3 } from "lucide-react";

import type { DataTableFeatures } from "@/components/tables/data-table-features";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { m } from "@/paraglide/messages";

export function DataTableViewOptions<TData extends RowData>({
	table,
}: {
	table: ReactTable<DataTableFeatures, TData>;
}) {
	"use no memo";
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="outline" size="sm" className="hidden h-8 lg:flex" />
				}
			>
				<Columns3 />
				{m.common_table_columns()}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px]">
				<DropdownMenuGroup>
					<DropdownMenuLabel>
						{m.common_table_toggle_columns()}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							const header = column.columnDef.header;
							const label =
								typeof header === "string" ? header : m.common_table_column();

							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{label}
								</DropdownMenuCheckboxItem>
							);
						})}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
