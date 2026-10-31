import { useSuspenseQuery } from "@tanstack/react-query";

import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { useDataTable } from "@/shared/components/tables/use-data-table";

import { runQueries } from "../data/queries";
import type { ProjectRunListInput } from "../model";
import { useRunColumns } from "./columns";

type Props = {
	queries: ProjectRunListInput;
};

export function RunList({ queries }: Props) {
	const columns = useRunColumns();
	const { data: runs } = useSuspenseQuery(runQueries.list(queries));
	const table = useDataTable({
		data: runs.items,
		columns,
		defaultColumn: { size: 160, minSize: 120, maxSize: 320 },
	});

	return (
		<TableView title={m.runs_list_title()}>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable table={table} />
			<TableFooter page={runs} />
		</TableView>
	);
}
