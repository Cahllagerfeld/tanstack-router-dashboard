import { queryOptions } from "@tanstack/react-query";

import { runFromApi } from "@/domain/runs";
import { apiClient, expectData } from "@/shared/api";
import type { ProjectRunListQueryParams } from "@/types/runs";

const baseKey = "runs" as const;

async function fetchRunList(params: ProjectRunListQueryParams) {
	const response = await apiClient.GET("/api/v1/runs", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(runFromApi),
	};
}

export const runKeys = {
	all: [baseKey] as const,
	lists: () => [...runKeys.all, "list"] as const,
	list: (params: ProjectRunListQueryParams) =>
		[...runKeys.lists(), params] as const,
};

export const runQueries = {
	list: (params: ProjectRunListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies ProjectRunListQueryParams;

		return queryOptions({
			queryKey: runKeys.list(mergedParams),
			queryFn: () => fetchRunList(mergedParams),
		});
	},
};
