export type Pipeline = {
	id: string;
	name: string;
	description?: string;
	created: Date | undefined;
};

/**
 * Mirrors the backend's list query, so its field names stay as they are.
 * A Project scopes Pipeline access, so `project` is required.
 */
export type PipelineListInput = {
	project: string;
	project_name_or_id?: string | null;
	hydrate?: boolean;
	sort_by?: string;
	logical_operator?: "and" | "or";
	page?: number;
	size?: number;
	id?: string | string[] | null;
	created?: string | string[] | null;
	updated?: string | string[] | null;
	tags?: string | string[] | null;
	scope_user?: string | null;
	user?: string | string[] | null;
	name?: string | string[] | null;
	latest_run_status?: string | null;
	latest_run_user?: string | null;
};

export type PipelinePage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Pipeline[];
};
