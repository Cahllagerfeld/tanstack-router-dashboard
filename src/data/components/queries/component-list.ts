import { apiPaths } from "@/data/api";
import { apiClient } from "@/data/api-client";
import { buildQueryString } from "@/lib/querystring";
import { ComponentsList, ComponentsListQueryParams } from "@/types/components";

export async function fetchComponentList(options?: ComponentsListQueryParams) {
	const data = await apiClient<ComponentsList>(
		apiPaths.components.base + (options ? `?${buildQueryString(options)}` : "")
	);

	return data;
}
