import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Checkbox } from "@/components/ui/checkbox";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { Component } from "@/types/components";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";

export function useComponentColumns(): ColumnDef<Component>[] {
	return [
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
			accessorFn: (row) => row.body?.type,
			cell: ({ row }) => {
				const type = row.original.body?.type;
				if (!type) return <NotAvailableTag />;
				return <p>{snakeCaseToTitleCase(type)}</p>;
			},
			meta: {
				className: "w-[17.5%]",
			},
		},
		{
			header: "Flavor",
			accessorFn: (row) => row.resources?.flavor.name,
			cell: ({ row }) => {
				const logoUrl = row.original.resources?.flavor.body?.logo_url;
				const flavor = row.original.resources?.flavor.name;
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
			accessorFn: (row) => row.body?.created,
			meta: {
				className: "w-[15%]",
			},
			cell: ({ row }) => {
				const dateString = row.original.body?.created;
				if (!dateString) return <NotAvailableTag />;
				return (
					<p>
						<DisplayDate short dateString={dateString} />
					</p>
				);
			},
		},
	];
}
