import { queryOptions } from "@tanstack/react-query";
import { ComponentsListQueryParams } from "@/types/components";
import { fetchComponentDetail } from "./fetch-detail";
import { fetchComponentList } from "./fetch-list";

const baseKey = "components" as const;

export const componentQueries = {
	baseKey: [baseKey] as const,
	list: (params?: ComponentsListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies ComponentsListQueryParams;

		return queryOptions({
			queryKey: [baseKey, mergedParams] as const,
			queryFn: () => fetchComponentList(mergedParams),
		});
	},
	detail: (componentId: string) =>
		queryOptions({
			queryKey: [baseKey, componentId] as const,
			queryFn: () => fetchComponentDetail(componentId),
		}),
};
