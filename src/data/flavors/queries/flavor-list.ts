import { FlavorList, FlavorListQueryParams } from "@/types/flavor";
import { apiPaths } from "../../api";
import { apiClient } from "../../api-client";
import { buildQueryString } from "@/lib/querystring";

export async function fetchFlavorsList({
	params,
}: {
	params: FlavorListQueryParams;
}) {
	const queryString = buildQueryString(params);
	const data = await apiClient<FlavorList>(
		apiPaths.flavors.base + (queryString ? `?${queryString}` : "")
	);
	return data;
}
