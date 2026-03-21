import { components } from "@/types/core";

export type Flavor = {
	id: string;
	name: string;
	logoUrl: string | undefined;
};

export function flavorFromApi(
	apiFlavor: components["schemas"]["FlavorResponse"]
): Flavor {
	return {
		id: apiFlavor.id,
		name: apiFlavor.name,
		logoUrl: apiFlavor.body?.logo_url ?? undefined,
	};
}
