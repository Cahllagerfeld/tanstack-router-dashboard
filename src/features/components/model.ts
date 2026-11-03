import type { ApiBody, ApiQuery } from "@/shared/api/client";

import type { ComponentType } from "./type/model";

export type Flavor = {
	id: string;
	name: string;
	logoUrl: string | undefined;
};

export type Component = {
	id: string;
	name: string;
	type: ComponentType | undefined;
	logoUrl: string | undefined;
	created: Date | undefined;
	updated: Date | undefined;
	flavor: Flavor | undefined;
	creatorName: string | undefined;
	configuration: Record<string, unknown> | undefined;
	labels: Record<string, unknown> | undefined;
};

/** A Flavor as the create wizard lists it. */
export type FlavorSummary = Flavor & {
	type: ComponentType | undefined;
	/** Backend `display_name`, falling back to `name`. */
	displayName: string;
	integration: string | undefined;
	isCustom: boolean;
};

/** A hydrated Flavor: everything needed to configure a Component of it. */
export type FlavorDetail = FlavorSummary & {
	/** JSON Schema of the Flavor's configuration; `{}` when the backend sends none. */
	configSchema: Record<string, unknown>;
	docsUrl: string | undefined;
};

export type ComponentListInput = ApiQuery<"/api/v1/components">;

export type FlavorListInput = ApiQuery<"/api/v1/flavors">;

export type CreateComponentInput = ApiBody<"/api/v1/components", "post">;

export type UpdateComponentInput = {
	componentId: string;
	body: ApiBody<"/api/v1/components/{component_id}", "put">;
};

export type DeleteComponentInput = {
	componentId: string;
};
