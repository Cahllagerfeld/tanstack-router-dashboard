import { queryOptions } from "@tanstack/react-query";

import { type Project, projectFromApi } from "@/domain/projects";
import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";
import type { ProjectListQueries } from "@/types/projects";

const baseKey = "projects" as const;

const PROJECT_LIST_SIZE = 100;
const PROJECT_LIST_SORT = "desc:created";

async function fetchProjectList(params: ProjectListQueries) {
	const response = await apiClient.GET("/api/v1/projects", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(projectFromApi),
	};
}

/** Publishes nothing unless every page loads: a partial list would hide Projects. */
async function fetchAllProjects() {
	const projects = new Map<string, Project>();
	let page = 1;
	let totalPages = 1;

	while (page <= totalPages) {
		const result = await fetchProjectList({
			sort_by: PROJECT_LIST_SORT,
			size: PROJECT_LIST_SIZE,
			page,
		});
		// Rows can shift between pages when a Project is created during the walk.
		for (const project of result.items) projects.set(project.id, project);
		totalPages = result.total_pages;
		page += 1;
	}

	return { items: [...projects.values()] };
}

async function fetchProjectDetail(projectId: string) {
	const response = await apiClient.GET(
		"/api/v1/projects/{project_name_or_id}",
		{
			params: {
				path: {
					project_name_or_id: projectId,
				},
			},
		}
	);
	return projectFromApi(expectData(response));
}

export const projectKeys = {
	all: [baseKey] as const,
	lists: () => [...projectKeys.all, "list"] as const,
	list: (params: ProjectListQueries) =>
		[...projectKeys.lists(), params] as const,
	allList: () => [...projectKeys.all, "all-list"] as const,
	details: () => [...projectKeys.all, "detail"] as const,
	detail: (projectId: string) => [...projectKeys.details(), projectId] as const,
};

export const projectQueries = {
	baseKey: projectKeys.all,
	list: (params?: ProjectListQueries) => {
		const mergedParams = {
			sort_by: PROJECT_LIST_SORT,
			size: PROJECT_LIST_SIZE,
			...params,
		} satisfies ProjectListQueries;

		return queryOptions({
			queryKey: projectKeys.list(mergedParams),
			queryFn: () => fetchProjectList(mergedParams),
		});
	},
	/** Every Project: the switcher is the only way to reach one. */
	allList: () =>
		queryOptions({
			queryKey: projectKeys.allList(),
			queryFn: fetchAllProjects,
		}),
	detail: (projectId: string) =>
		queryOptions({
			queryKey: projectKeys.detail(projectId),
			queryFn: () => fetchProjectDetail(projectId),
		}),
};
