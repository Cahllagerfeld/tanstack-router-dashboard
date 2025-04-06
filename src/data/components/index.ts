import { queryOptions } from "@tanstack/react-query";
import { fetchComponentList } from "./queries/component-list";
import { ComponentsListQueryParams } from "@/types/components";

export const componentQueries = {
	componentList: (options?: ComponentsListQueryParams) =>
		queryOptions({
			queryFn: () => fetchComponentList(options),
			queryKey: ["components", options],
		}),
};
