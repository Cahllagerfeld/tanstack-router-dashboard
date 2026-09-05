import { queryOptions } from "@tanstack/react-query";

import { pipelineFromApi } from "@/domain/pipelines";
import { apiClient, expectData } from "@/shared/api";
import { type PipelineListQueryParams } from "@/types/pipelines";

const baseKey = "pipelines" as const;

async function fetchPipelineList(params: PipelineListQueryParams) {
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

export const pipelineKeys = {
	all: [baseKey] as const,
	lists: () => [...pipelineKeys.all, "list"] as const,
	list: (params: PipelineListQueryParams) =>
		[...pipelineKeys.lists(), params] as const,
};

export const pipelineQueries = {
	list: (params?: PipelineListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies PipelineListQueryParams;

		return queryOptions({
			queryKey: pipelineKeys.list(mergedParams),
			queryFn: () => fetchPipelineList(mergedParams),
		});
	},
};
