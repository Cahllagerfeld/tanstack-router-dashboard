export type Stack = {
	id: string;
	name: string;
	creatorName: string | undefined;
	created: Date | undefined;
};

/** Mirrors the backend's list query, so its field names stay as they are. */
export type StackListInput = {
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
	name?: string | string[] | null;
	description?: string | string[] | null;
	component_id?: string | string[] | null;
	component?: string | string[] | null;
};

export type StackPage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Stack[];
};
