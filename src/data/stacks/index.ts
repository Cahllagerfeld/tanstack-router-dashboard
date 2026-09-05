import { queryOptions } from "@tanstack/react-query";

import { stackFromApi } from "@/domain/stacks";
import { expectData } from "@/lib/fetch-error";
import type { StacksListQueryParams } from "@/types/stacks";

import { apiClient } from "../api-client";

const baseKey = "stacks" as const;

async function fetchStackList(params: StacksListQueryParams) {
	const response = await apiClient.GET("/api/v1/stacks", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(stackFromApi),
	};
}

async function fetchStackDetail(stackId: string) {
	const response = await apiClient.GET("/api/v1/stacks/{stack_id}", {
		params: {
			path: {
				stack_id: stackId,
			},
		},
	});
	return stackFromApi(expectData(response));
}

export const stackKeys = {
	all: [baseKey] as const,
	lists: () => [...stackKeys.all, "list"] as const,
	list: (params: StacksListQueryParams) =>
		[...stackKeys.lists(), params] as const,
	details: () => [...stackKeys.all, "detail"] as const,
	detail: (stackId: string) => [...stackKeys.details(), stackId] as const,
};

export const stackQueries = {
	baseKey: stackKeys.all,
	list: (params?: StacksListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies StacksListQueryParams;

		return queryOptions({
			queryKey: stackKeys.list(mergedParams),
			queryFn: () => fetchStackList(mergedParams),
		});
	},
	detail: (stackId: string) =>
		queryOptions({
			queryKey: stackKeys.detail(stackId),
			queryFn: () => fetchStackDetail(stackId),
		}),
};
