import type { ApiQuery } from "@/shared/api/client";

export type Project = {
	id: string;
	name: string;
	displayName: string | undefined;
};

export type ProjectListInput = ApiQuery<"/api/v1/projects">;

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
