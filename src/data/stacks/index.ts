import { queryOptions } from "@tanstack/react-query";
import { StacksListQueryParams } from "@/types/stacks";
import { fetchStackDetail } from "./fetch-detail";
import { fetchStackList } from "./fetch-list";

const baseKey = "stacks" as const;

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
