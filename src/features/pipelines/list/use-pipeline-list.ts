import { useSuspenseQuery } from "@tanstack/react-query";

import { useDataTable } from "@/shared/components/tables/use-data-table";

import { pipelineQueries } from "../data/queries";
import type { PipelineListInput } from "../model";
import { usePipelineColumns } from "./columns";

export function usePipelineList(params: PipelineListInput) {
	const columns = usePipelineColumns();
	const { data: pipelinePage } = useSuspenseQuery(pipelineQueries.list(params));
	const table = useDataTable({
		data: pipelinePage.items,
		columns,
	});

	return { pipelinePage, table };
}
