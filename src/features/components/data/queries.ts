import { queryOptions } from "@tanstack/react-query";

import type { ComponentListInput, FlavorListInput } from "../model";
import {
	fetchComponentDetail,
	fetchComponentList,
	fetchFlavorDetail,
	fetchFlavorList,
} from "./requests";

const baseKey = "components" as const;

/** Large enough that one page holds every Flavor of a type. */
const FLAVOR_PAGE_SIZE = 1000;

export const componentKeys = {
	all: [baseKey] as const,
	lists: () => [...componentKeys.all, "list"] as const,
	list: (params: ComponentListInput) =>
		[...componentKeys.lists(), params] as const,
	details: () => [...componentKeys.all, "detail"] as const,
	detail: (componentId: string) =>
		[...componentKeys.details(), componentId] as const,
	flavors: () => [...componentKeys.all, "flavors"] as const,
	flavorLists: () => [...componentKeys.flavors(), "list"] as const,
	flavorList: (params: FlavorListInput) =>
		[...componentKeys.flavorLists(), params] as const,
	flavorDetails: () => [...componentKeys.flavors(), "detail"] as const,
	flavorDetail: (flavorId: string) =>
		[...componentKeys.flavorDetails(), flavorId] as const,
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
	flavorList: (params?: FlavorListInput) => {
		const mergedParams = {
			sort_by: "asc:display_name",
			size: FLAVOR_PAGE_SIZE,
			...params,
		} satisfies FlavorListInput;

		return queryOptions({
			queryKey: componentKeys.flavorList(mergedParams),
			queryFn: () => fetchFlavorList(mergedParams),
		});
	},
	flavorDetail: (flavorId: string) =>
		queryOptions({
			queryKey: componentKeys.flavorDetail(flavorId),
			queryFn: () => fetchFlavorDetail(flavorId),
		}),
};
