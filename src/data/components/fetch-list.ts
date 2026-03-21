import { expectData } from "@/lib/fetch-error";
import { ComponentsListQueryParams } from "@/types/components";
import { apiClient } from "../api-client";

export async function fetchComponentList(params: ComponentsListQueryParams) {
	const response = await apiClient.GET("/api/v1/components", {
		params: {
			query: params,
		},
	});
	return expectData(response);
}
