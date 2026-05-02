import { queryOptions } from "@tanstack/react-query";
import { ComponentsListQueryParams } from "@/types/components";
import { fetchComponentDetail } from "./fetch-detail";
import { fetchComponentList } from "./fetch-list";

const baseKey = "components" as const;

export const componentKeys = {
	all: [baseKey] as const,
	lists: () => [...componentKeys.all, "list"] as const,
	list: (params: ComponentsListQueryParams) =>
		[...componentKeys.lists(), params] as const,
	details: () => [...componentKeys.all, "detail"] as const,
	detail: (componentId: string) =>
		[...componentKeys.details(), componentId] as const,
};

export const componentQueries = {
	baseKey: componentKeys.all,
	list: (params?: ComponentsListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies ComponentsListQueryParams;

		return queryOptions({
			queryKey: componentKeys.list(mergedParams),
			queryFn: () => fetchComponentList(mergedParams),
		});
	},
	detail: (componentId: string) =>
		queryOptions({
			queryKey: componentKeys.detail(componentId),
			queryFn: () => fetchComponentDetail(componentId),
		}),
};
