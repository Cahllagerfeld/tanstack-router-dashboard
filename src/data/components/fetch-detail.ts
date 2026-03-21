import { componentFromApi } from "@/domain/components";
import { expectData } from "@/lib/fetch-error";
import { apiClient } from "../api-client";

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
