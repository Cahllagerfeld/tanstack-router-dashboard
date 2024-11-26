import { apiPaths } from "../../api";
import { WorkspaceList } from "@/types/workspaces";
import { apiClient } from "../../api-client";

export async function fetchWorkspaceList() {
	const data = await apiClient<WorkspaceList>(apiPaths.workspaces.base);
	return data;
}
