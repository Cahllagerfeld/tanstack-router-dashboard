import { queryOptions } from "@tanstack/react-query";
import { fetchWorkspaceList } from "./queries/workspace-list";

export const workspaceQueries = {
	workspaceList: () =>
		queryOptions({
			queryKey: ["workspaces"],
			queryFn: fetchWorkspaceList,
		}),
};
