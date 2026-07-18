import { pipelineFromApi } from "@/domain/pipelines";
import { expectData } from "@/lib/fetch-error";
import { PipelineListQueryParams } from "@/types/pipelines";
import { apiClient } from "../api-client";

export async function fetchPipelineList(params: PipelineListQueryParams) {
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
