import { DataTableViewOptions } from "@/components/tables/columns-visibility-toggle";
import { secretQueries } from "@/data/secrets";
import { userQueries } from "@/data/user";
import { CreateSecretDialogWithTrigger } from "@/features/secrets/create-secret-dialog";
import { useSecretColumns } from "@/features/secrets/secrets-list/columns";
import { SecretsTable } from "@/features/secrets/secrets-list/secrets-table";
import { commonFilterSchema } from "@/features/filters/common-filter-schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	ColumnSizingState,
	getCoreRowModel,
	RowSelectionState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

const querySchema = commonFilterSchema;

export const Route = createFileRoute("/(private)/_sidebar/settings/secrets")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { page, size } }) => ({ page, size }),
	loader: async ({ context: { queryClient }, deps: { page, size } }) => {
		await Promise.all([
			queryClient.ensureQueryData(secretQueries.list({ page, size })),
			queryClient.ensureQueryData(userQueries.currentUser()),
		]);
		return { crumb: "Secrets" };
	},
	head: () => ({
		meta: [{ title: "Secrets" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const columns = useSecretColumns();
	const { size, page } = Route.useSearch();

	const { data } = useSuspenseQuery(secretQueries.list({ size, page }));

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable({
		data: data.items,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.id,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnSizingChange: setColumnSizing,
		onRowSelectionChange: setRowSelection,
		columnResizeMode: "onChange",
		enableColumnResizing: true,
		defaultColumn: {
			enableHiding: false,
			size: 200,
			minSize: 150,
			maxSize: 400,
		},
		state: {
			columnVisibility,
			columnSizing,
			rowSelection,
		},
	});

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Secrets</h1>
				<p className="text-muted-foreground text-sm">
					Manage server-wide secrets and sensitive key-value pairs.
				</p>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<CreateSecretDialogWithTrigger />
				<DataTableViewOptions table={table} />
			</div>
			<SecretsTable table={table} />
		</div>
	);
}
