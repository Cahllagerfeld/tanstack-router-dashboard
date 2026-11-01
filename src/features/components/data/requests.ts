import { apiClient } from "@/shared/api/client";
import { expectData, expectOptionalData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { ComponentListInput, DeleteComponentInput } from "../model";
import { componentFromApi } from "./map";

export async function fetchComponentList(params: ComponentListInput) {
	const response = await apiClient.GET("/api/v1/components", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), componentFromApi);
}

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

export async function deleteComponent({ componentId }: DeleteComponentInput) {
	const response = await apiClient.DELETE("/api/v1/components/{component_id}", {
		params: { path: { component_id: componentId } },
	});
	expectOptionalData(response);
}
