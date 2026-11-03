import { parseBackendDate } from "@/shared/lib/dates";

import type { Component, Flavor, FlavorDetail, FlavorSummary } from "../model";
import type { ComponentDto, FlavorDto } from "./dto";

export function flavorFromApi(apiFlavor: FlavorDto): Flavor {
	return {
		id: apiFlavor.id,
		name: apiFlavor.name,
		logoUrl: apiFlavor.body?.logo_url ?? undefined,
	};
}

export function flavorSummaryFromApi(apiFlavor: FlavorDto): FlavorSummary {
	return {
		...flavorFromApi(apiFlavor),
		type: apiFlavor.body?.type,
		displayName: apiFlavor.body?.display_name || apiFlavor.name,
		integration: apiFlavor.body?.integration ?? undefined,
		isCustom: apiFlavor.body?.is_custom ?? false,
	};
}

export function flavorDetailFromApi(apiFlavor: FlavorDto): FlavorDetail {
	return {
		...flavorSummaryFromApi(apiFlavor),
		configSchema: apiFlavor.metadata?.config_schema ?? {},
		docsUrl: apiFlavor.metadata?.docs_url ?? undefined,
	};
}

export function componentFromApi(apiComponent: ComponentDto): Component {
	return {
		id: apiComponent.id,
		name: apiComponent.name,
		type: apiComponent.body?.type,
		logoUrl: apiComponent.body?.logo_url ?? undefined,
		flavor: apiComponent.resources?.flavor
			? flavorFromApi(apiComponent.resources.flavor)
			: undefined,
		created: apiComponent.body?.created
			? parseBackendDate(apiComponent.body.created)
			: undefined,
		updated: apiComponent.body?.updated
			? parseBackendDate(apiComponent.body.updated)
			: undefined,
		creatorName: apiComponent.resources?.user?.name ?? undefined,
		configuration: apiComponent.metadata?.configuration ?? undefined,
		labels: apiComponent.metadata?.labels ?? undefined,
	};
}
