import { queryOptions } from "@tanstack/react-query";

import type { StackListInput } from "../model";
import { fetchStackDetail, fetchStackList } from "./requests";

const baseKey = "stacks" as const;

export const stackKeys = {
	all: [baseKey] as const,
	lists: () => [...stackKeys.all, "list"] as const,
	list: (params: StackListInput) => [...stackKeys.lists(), params] as const,
	details: () => [...stackKeys.all, "detail"] as const,
	detail: (stackId: string) => [...stackKeys.details(), stackId] as const,
};

export const stackQueries = {
	baseKey: stackKeys.all,
	list: (params?: StackListInput) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies StackListInput;

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
