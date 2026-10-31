import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

import type { ComponentListInput, ComponentPage } from "../model";
import { componentFromApi } from "./map";

export async function fetchComponentList(
	params: ComponentListInput
): Promise<ComponentPage> {
	const response = await apiClient.GET("/api/v1/components", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(componentFromApi),
	};
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
