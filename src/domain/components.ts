import { parseBackendDate } from "@/lib/dates";
import { ComponentType } from "@/types/components";
import { components } from "@/types/core";
import { Flavor, flavorFromApi } from "./flavors";
import { User, userFromApi } from "./users";

export type Component = {
	id: string;
	name: string;
	type: ComponentType | undefined;
	logoUrl: string | undefined;
	created: Date | undefined;
	updated: Date | undefined;
	flavor: Flavor | undefined;
	user: User | undefined;
	configuration: Record<string, unknown> | undefined;
	environment: Record<string, unknown> | undefined;
	secrets: string[] | undefined;
};

export function componentFromApi(
	apiComponent: components["schemas"]["ComponentResponse"]
): Component {
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
		user: apiComponent.resources?.user
			? userFromApi(apiComponent.resources.user)
			: undefined,
		configuration: apiComponent.metadata?.configuration ?? undefined,
		environment: apiComponent.metadata?.environment ?? undefined,
		secrets: apiComponent.metadata?.secrets ?? undefined,
	};
}
