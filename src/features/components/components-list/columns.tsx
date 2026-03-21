import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Checkbox } from "@/components/ui/checkbox";
import { Component } from "@/domain/components";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

export function useComponentColumns(): ColumnDef<Component>[] {
	return [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					indeterminate={
						!table.getIsAllPageRowsSelected() &&
						table.getIsSomePageRowsSelected()
					}
					onCheckedChange={(checked) =>
						table.toggleAllPageRowsSelected(checked)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(checked) => row.toggleSelected(checked)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			header: "Name",
			accessorKey: "name",
			cell: ({ row }) => (
				<Link
					to="/components/$component_id"
					params={{ component_id: row.original.id }}
					className="text-primary hover:underline"
				>
					{row.original.name}
				</Link>
			),
			meta: {
				className: "w-1/2",
			},
		},
		{
			header: "Type",
			accessorFn: (row) => row.type,
			cell: ({ row }) => {
				const type = row.original.type;
				if (!type) return <NotAvailableTag />;
				return <p>{snakeCaseToTitleCase(type)}</p>;
			},
			meta: {
				className: "w-[17.5%]",
			},
		},
		{
			header: "Flavor",
			accessorFn: (row) => row.flavor?.name,
			cell: ({ row }) => {
				const logoUrl = row.original.flavor?.logoUrl;
				const flavor = row.original.flavor?.name;
				if (!flavor) return <NotAvailableTag />;
				return (
					<div className="flex items-center gap-2">
						{logoUrl && (
							<img
								src={logoUrl}
								alt={flavor}
								width={24}
								height={24}
								className="shrink-0"
							/>
						)}
						<p>{snakeCaseToTitleCase(flavor)}</p>
					</div>
				);
			},
			meta: {
				className: "w-[17.5%]",
			},
		},
		{
			header: "Created at",
			accessorFn: (row) => row.created,
			meta: {
				className: "w-[15%]",
			},
			cell: ({ row }) => {
				const created = row.original.created;
				if (!created) return <NotAvailableTag />;
				return (
					<p>
						<DisplayDate short date={created} />
					</p>
				);
			},
		},
	];
}
