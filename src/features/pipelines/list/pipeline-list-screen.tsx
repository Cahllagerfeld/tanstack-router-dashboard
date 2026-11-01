import { m } from "@/paraglide/messages";
import { DataTableViewOptions } from "@/shared/components/tables/columns-visibility-toggle";
import { DataTable } from "@/shared/components/tables/data-table";
import { TableEmpty } from "@/shared/components/tables/table-empty";
import { TableFooter } from "@/shared/components/tables/table-footer";
import { TableToolbar } from "@/shared/components/tables/table-toolbar";
import { TableView } from "@/shared/components/tables/table-view";
import { getEntityIcon } from "@/shared/lib/entity-icons";

import type { PipelineListInput } from "../model";
import { usePipelineList } from "./use-pipeline-list";

export function PipelineListScreen({ params }: { params: PipelineListInput }) {
	const { pipelinePage, table } = usePipelineList(params);

	return (
		<TableView title={m.pipelines_list_title()}>
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
						title={m.pipelines_empty_title()}
						description={m.pipelines_empty_description()}
					/>
				}
			/>
			<TableFooter page={pipelinePage} />
		</TableView>
	);
}
