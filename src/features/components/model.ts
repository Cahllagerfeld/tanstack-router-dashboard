import type { ApiQuery } from "@/shared/api/client";

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
	environment: Record<string, unknown> | undefined;
	secrets: string[] | undefined;
};

export type ComponentListInput = ApiQuery<"/api/v1/components">;
