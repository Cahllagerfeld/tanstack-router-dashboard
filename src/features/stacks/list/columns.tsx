import { InlineAvatar } from "@/components/avatars/inline-avatar";
import DisplayDate from "@/components/display-date";
import { NotAvailableTag } from "@/components/not-available-tag";
import { Checkbox } from "@/components/ui/checkbox";
import { getUsername } from "@/lib/names";
import { Stack } from "@/types/stacks";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function useStackListColumns(): ColumnDef<Stack>[] {
	return useMemo(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && "indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
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
					className: "w-3/5",
				},
			},
			{
				header: "Author",
				accessorFn: (row) => row.resources?.user?.name,
				cell: ({ row }) => {
					const user = row.original.resources?.user;
					if (!user) return <NotAvailableTag />;
					return (
						<InlineAvatar
							username={getUsername(user)}
							avatarUrl={user.body?.avatar_url ?? undefined}
						/>
					);
				},
			},
			{
				header: "Created at",
				accessorFn: (row) => row.body?.created,
				// meta: {
				// 	className: "w-1/5",
				// },
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
		],
		[]
	);
}
