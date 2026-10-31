import { queryOptions } from "@tanstack/react-query";

import type { PipelineListInput } from "../model";
import { fetchPipelineList } from "./requests";

const baseKey = "pipelines" as const;

export const pipelineKeys = {
	all: [baseKey] as const,
	lists: () => [...pipelineKeys.all, "list"] as const,
	list: (params: PipelineListInput) =>
		[...pipelineKeys.lists(), params] as const,
};

export const pipelineQueries = {
	list: (params: PipelineListInput) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies PipelineListInput;

		return queryOptions({
			queryKey: pipelineKeys.list(mergedParams),
			queryFn: () => fetchPipelineList(mergedParams),
		});
	},
};
