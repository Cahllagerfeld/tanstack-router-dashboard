import { apiPaths } from "@/data/api";
import { apiClient } from "@/data/api-client";
import { buildQueryString } from "@/lib/querystring";
import { ComponentsList, ComponentsListQueryParams } from "@/types/components";

export async function fetchWorkspaceComponentsList(
	workspaceId: string,
	options?: ComponentsListQueryParams
) {
	const data = await apiClient<ComponentsList>(
		apiPaths.workspaces.components(workspaceId) +
			(options ? `?${buildQueryString(options)}` : "")
	);

	return data;
}
