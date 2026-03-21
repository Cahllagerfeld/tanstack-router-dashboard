import { queryOptions } from "@tanstack/react-query";
import { StacksListQueryParams } from "@/types/stacks";
import { fetchStackDetail } from "./fetch-detail";
import { fetchStackList } from "./fetch-list";

const baseKey = "stacks" as const;

export const stackQueries = {
	baseKey: [baseKey] as const,
	list: (params?: StacksListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies StacksListQueryParams;

		return queryOptions({
			queryKey: [baseKey, mergedParams] as const,
			queryFn: () => fetchStackList(mergedParams),
		});
	},
	detail: (stackId: string) =>
		queryOptions({
			queryKey: [baseKey, stackId] as const,
			queryFn: () => fetchStackDetail(stackId),
		}),
};
