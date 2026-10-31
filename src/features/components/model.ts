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

/** Mirrors the backend's list query, so its field names stay as they are. */
export type ComponentListInput = {
	project_name_or_id?: string | null;
	hydrate?: boolean;
	sort_by?: string;
	logical_operator?: "and" | "or";
	page?: number;
	size?: number;
	id?: string | string[] | null;
	created?: string | string[] | null;
	updated?: string | string[] | null;
	scope_user?: string | null;
	user?: string | string[] | null;
	scope_type?: string | null;
	name?: string | string[] | null;
	flavor?: string | string[] | null;
	type?: string | string[] | null;
	connector_id?: string | string[] | null;
	stack_id?: string | string[] | null;
};

export type ComponentPage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Component[];
};
