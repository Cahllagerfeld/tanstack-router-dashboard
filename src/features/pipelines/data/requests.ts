import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

import type { PipelineListInput, PipelinePage } from "../model";
import { pipelineFromApi } from "./map";

export async function fetchPipelineList(
	params: PipelineListInput
): Promise<PipelinePage> {
	const response = await apiClient.GET("/api/v1/pipelines", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(pipelineFromApi),
	};
}
