import { apiClient } from "@/shared/api/client";
import { expectData, expectOptionalData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type {
	ComponentListInput,
	CreateComponentInput,
	DeleteComponentInput,
	FlavorListInput,
	UpdateComponentInput,
} from "../model";
import {
	componentFromApi,
	flavorDetailFromApi,
	flavorSummaryFromApi,
} from "./map";

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

export async function createComponent(body: CreateComponentInput) {
	const response = await apiClient.POST("/api/v1/components", { body });
	return componentFromApi(expectData(response));
}

export async function updateComponent({
	componentId,
	body,
}: UpdateComponentInput) {
	const response = await apiClient.PUT("/api/v1/components/{component_id}", {
		params: { path: { component_id: componentId } },
		body,
	});
	return componentFromApi(expectData(response));
}

export async function deleteComponent({ componentId }: DeleteComponentInput) {
	const response = await apiClient.DELETE("/api/v1/components/{component_id}", {
		params: { path: { component_id: componentId } },
	});
	expectOptionalData(response);
}

export async function fetchFlavorList(params: FlavorListInput) {
	const response = await apiClient.GET("/api/v1/flavors", {
		params: { query: params },
	});
	return mapPage(expectData(response), flavorSummaryFromApi);
}

export async function fetchFlavorDetail(flavorId: string) {
	const response = await apiClient.GET("/api/v1/flavors/{flavor_id}", {
		params: { path: { flavor_id: flavorId }, query: { hydrate: true } },
	});
	return flavorDetailFromApi(expectData(response));
}
