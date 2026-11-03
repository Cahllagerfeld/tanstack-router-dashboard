import type { ColumnDef } from "@tanstack/react-table";

import { m } from "@/paraglide/messages";
import DisplayDate from "@/shared/components/display-date";
import { NotAvailableTag } from "@/shared/components/not-available-tag";
import {
	columnSize,
	type DataTableFeatures,
} from "@/shared/components/tables/data-table-features";
import {
	actionsColumn,
	selectColumn,
} from "@/shared/components/tables/edge-columns";
import { Badge } from "@/shared/ui/badge";

import { SecretActions } from "../delete/secret-actions";
import type { Secret } from "../model";

export function useSecretColumns(): ColumnDef<DataTableFeatures, Secret>[] {
	return [
		selectColumn(),
		{
			header: m.secrets_table_name(),
			accessorKey: "name",
			...columnSize.name,
			enableHiding: true,
			cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
		},
		{
			id: "Visibility",
			header: m.secrets_table_visibility(),
			accessorFn: (row) => row.isPrivate,
			...columnSize.badge,
			enableHiding: true,
			cell: ({ row }) => {
				const isPrivate = row.original.isPrivate;
				if (isPrivate === undefined) return <NotAvailableTag />;
				return (
					<Badge variant={isPrivate ? "secondary" : "outline"}>
						{isPrivate
							? m.secrets_visibility_private()
							: m.secrets_visibility_public()}
					</Badge>
				);
			},
		},
		{
			id: "Created by",
			header: m.secrets_table_created_by(),
			accessorFn: (row) => row.creatorName,
			...columnSize.person,
			enableHiding: true,
			cell: ({ row }) => {
				const creatorName = row.original.creatorName;
				if (!creatorName) return <NotAvailableTag />;
				return <p>{creatorName}</p>;
			},
		},
		{
			id: "Created at",
			header: m.secrets_table_created_at(),
			accessorFn: (row) => row.created,
			...columnSize.date,
			enableHiding: true,
			cell: ({ row }) => {
				const date = row.original.created;
				if (!date) return <NotAvailableTag />;
				return <DisplayDate date={date} />;
			},
		},
		actionsColumn((secret) => <SecretActions secret={secret} />),
	];
}
