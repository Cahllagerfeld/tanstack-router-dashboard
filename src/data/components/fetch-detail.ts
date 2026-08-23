import { apiClient } from "../api-client";
import { componentFromApi } from "@/domain/components";
import { expectData } from "@/lib/fetch-error";

export async function fetchComponentDetail(componentId: string) {
	const response = await apiClient.GET("/api/v1/components/{component_id}", {
		params: {
			path: {
				component_id: componentId,
			},
		},
	});
	return componentFromApi(expectData(response));
}
