import { fetchPipelineList } from "./fetch-list";
import { type PipelineListQueryParams } from "@/types/pipelines";
import { queryOptions } from "@tanstack/react-query";

const baseKey = "pipelines" as const;

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
