export type Project = {
	id: string;
	name: string;
	displayName: string | undefined;
};

/** Mirrors the backend's list query, so its field names stay as they are. */
export type ProjectListInput = {
	hydrate?: boolean;
	sort_by?: string;
	logical_operator?: "and" | "or";
	page?: number;
	size?: number;
	id?: string | string[] | null;
	created?: string | string[] | null;
	updated?: string | string[] | null;
	name?: string | string[] | null;
	display_name?: string | string[] | null;
};

export type ProjectPage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Project[];
};

export type CreateProjectInput = {
	name: string;
	display_name: string;
	description: string;
};

export type DeleteProjectInput = {
	projectId: string;
};

export function getProjectLabel(project: Project) {
	return project.displayName ?? project.name;
}
