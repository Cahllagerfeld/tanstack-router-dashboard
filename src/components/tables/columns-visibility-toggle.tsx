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
import { type Table } from "@tanstack/react-table";
import { Columns3 } from "lucide-react";

export function DataTableViewOptions<TData>({
	table,
}: {
	table: Table<TData>;
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
				Columns
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px]">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							);
						})}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
