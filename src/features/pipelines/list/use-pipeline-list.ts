import { useSuspenseQuery } from "@tanstack/react-query";

import { useDataTable } from "@/shared/components/tables/use-data-table";

import { pipelineQueries } from "../data/queries";
import type { PipelineListInput } from "../model";
import { usePipelineColumns } from "./columns";

export function usePipelineList(params: PipelineListInput) {
	const columns = usePipelineColumns();
	const { data: pipelines } = useSuspenseQuery(pipelineQueries.list(params));
	const table = useDataTable({
		data: pipelines.items,
		columns,
	});

	return { pipelines, table };
}
