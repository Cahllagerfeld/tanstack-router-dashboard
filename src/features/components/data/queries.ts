import { queryOptions } from "@tanstack/react-query";

import type { ComponentListInput } from "../model";
import { fetchComponentDetail, fetchComponentList } from "./requests";

const baseKey = "components" as const;

export const componentKeys = {
	all: [baseKey] as const,
	lists: () => [...componentKeys.all, "list"] as const,
	list: (params: ComponentListInput) =>
		[...componentKeys.lists(), params] as const,
	details: () => [...componentKeys.all, "detail"] as const,
	detail: (componentId: string) =>
		[...componentKeys.details(), componentId] as const,
};

export const componentQueries = {
	baseKey: componentKeys.all,
	list: (params?: ComponentListInput) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies ComponentListInput;

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
