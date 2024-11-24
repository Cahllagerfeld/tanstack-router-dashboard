import { queryOptions } from "@tanstack/react-query";
import { fetchWorkspaceList } from "./workspace-list";

export const workspaceQueries = {
	workspaceList: () =>
		queryOptions({
			queryKey: ["workspaces"],
			queryFn: fetchWorkspaceList,
		}),
};
