import DisplayDate from "@/components/DisplayDate";
import { Checkbox } from "@/components/ui/checkbox";
import { Component } from "@/types/components";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function useComponentColumns(): ColumnDef<Component>[] {
	const cols: ColumnDef<Component>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			header: "Name",
			accessorKey: "name",
			meta: {
				className: "w-1/2",
			},
		},
		{
			header: "Type",
			accessorFn: (row) => row.body?.type,
			meta: {
				className: "w-[17.5%]",
			},
		},
		{
			header: "Flavor",
			accessorFn: (row) => row.resources?.flavor.name,
			meta: {
				className: "w-[17.5%]",
			},
		},
		{
			header: "Created at",
			accessorFn: (row) => row.body?.created,
			meta: {
				className: "w-[15%]",
			},
			cell: ({ row }) => {
				const dateString = row.original.body?.created;
				if (!dateString) return "Not available";
				return (
					<p>
						<DisplayDate short dateString={dateString} />
					</p>
				);
			},
		},
	];

	return useMemo(() => cols, []);
}
