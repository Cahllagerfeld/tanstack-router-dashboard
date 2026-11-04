import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableEmpty } from "@/shared/components/tables/table-empty";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { getEntityIcon } from "@/shared/lib/entity-icons";

import type { SnapshotListInput } from "../model";
import { useSnapshotList } from "./use-snapshot-list";

export function SnapshotListScreen({ params }: { params: SnapshotListInput }) {
	const { snapshotPage, table } = useSnapshotList(params);

	return (
		<TableView title={m.snapshots_list_title()}>
			<TableToolbar>
				<TableToolbar.End>
					<DataTableViewOptions table={table} />
				</TableToolbar.End>
			</TableToolbar>
			<DataTable
				table={table}
				empty={
					<TableEmpty
						icon={getEntityIcon("pipeline")}
						title={m.snapshots_empty_title()}
						description={m.snapshots_empty_description()}
					/>
				}
			/>
			<TableFooter page={snapshotPage} />
		</TableView>
	);
}
