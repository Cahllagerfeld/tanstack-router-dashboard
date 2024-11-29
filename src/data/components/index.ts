import { queryOptions } from "@tanstack/react-query";
import { fetchWorkspaceComponentsList } from "./queries/workspace-list";
import { ComponentsListQueryParams } from "@/types/components";

export const componentQueries = {
	workspaceComponentList: (
		workspaceId: string,
		options?: ComponentsListQueryParams
	) =>
		queryOptions({
			queryFn: () => fetchWorkspaceComponentsList(workspaceId, options),
			queryKey: ["workspaces", workspaceId, "components"],
		}),
};
