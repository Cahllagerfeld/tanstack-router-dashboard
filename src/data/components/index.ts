import { queryOptions } from "@tanstack/react-query";

import { componentFromApi } from "@/domain/components";
import { apiClient, expectData } from "@/shared/api";
import type { ComponentsListQueryParams } from "@/types/components";

const baseKey = "components" as const;

async function fetchComponentList(params: ComponentsListQueryParams) {
	const response = await apiClient.GET("/api/v1/components", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(componentFromApi),
	};
}

async function fetchComponentDetail(componentId: string) {
	const response = await apiClient.GET("/api/v1/components/{component_id}", {
		params: {
			path: {
				component_id: componentId,
			},
		},
	});
	return componentFromApi(expectData(response));
}

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
