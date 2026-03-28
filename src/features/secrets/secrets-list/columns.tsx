import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	ResponsiveAlertDialog,
	ResponsiveAlertDialogAction,
	ResponsiveAlertDialogCancel,
	ResponsiveAlertDialogContent,
	ResponsiveAlertDialogDescription,
	ResponsiveAlertDialogFooter,
	ResponsiveAlertDialogHeader,
	ResponsiveAlertDialogTitle,
} from "@/components/ui/responsive-alert-dialog";
import { useDeleteSecret } from "@/data/secrets/mutations/delete-secret";
import type { Secret } from "@/domain/secrets";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

function DeleteSecretControl({ secret }: { secret: Secret }) {
	const [open, setOpen] = useState(false);
	const { mutate, isPending } = useDeleteSecret();

	return (
		<ResponsiveAlertDialog open={open} onOpenChange={setOpen}>
			<Button
				variant="ghost"
				size="sm"
				className="text-destructive hover:text-destructive"
				onClick={() => setOpen(true)}
			>
				Delete
			</Button>
			<ResponsiveAlertDialogContent>
				<ResponsiveAlertDialogHeader>
					<ResponsiveAlertDialogTitle>
						Delete secret?
					</ResponsiveAlertDialogTitle>
					<ResponsiveAlertDialogDescription>
						This will permanently remove &quot;{secret.name}&quot; and all of
						its keys. This action cannot be undone.
					</ResponsiveAlertDialogDescription>
				</ResponsiveAlertDialogHeader>
				<ResponsiveAlertDialogFooter>
					<ResponsiveAlertDialogCancel>Cancel</ResponsiveAlertDialogCancel>
					<ResponsiveAlertDialogAction
						variant="destructive"
						disabled={isPending}
						onClick={() =>
							mutate(
								{ secretId: secret.id },
								{
									onSuccess: () => setOpen(false),
								}
							)
						}
					>
						{isPending ? "Deleting…" : "Delete"}
					</ResponsiveAlertDialogAction>
				</ResponsiveAlertDialogFooter>
			</ResponsiveAlertDialogContent>
		</ResponsiveAlertDialog>
	);
}

export function useSecretColumns(): ColumnDef<Secret>[] {
	return [
		{
			id: "select",
			enableResizing: false,
			size: 32,
			minSize: 32,
			maxSize: 32,
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
			enableHiding: true,
			cell: ({ row }) => <div>{row.original.name}</div>,
			meta: {
				className: "w-2/5",
			},
		},
		{
			header: "Keys",
			enableHiding: true,
			accessorFn: (row) => row.keyCount,
			cell: ({ row }) => <span>{row.original.keyCount}</span>,
			meta: {
				className: "w-[15%]",
			},
		},
		{
			header: "Created",
			enableHiding: true,
			accessorFn: (row) => row.created,
			meta: {
				className: "w-[20%]",
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
		{
			id: "actions",
			header: "",
			enableHiding: true,
			enableResizing: false,
			size: 100,
			cell: ({ row }) => <DeleteSecretControl secret={row.original} />,
		},
	];
}
