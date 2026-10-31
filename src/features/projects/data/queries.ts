import { queryOptions } from "@tanstack/react-query";

import type { Project, ProjectListInput } from "../model";
import { fetchProjectDetail, fetchProjectList } from "./requests";

const baseKey = "projects" as const;

const PROJECT_LIST_SIZE = 100;
const PROJECT_LIST_SORT = "desc:created";

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

export const projectKeys = {
	all: [baseKey] as const,
	lists: () => [...projectKeys.all, "list"] as const,
	list: (params: ProjectListInput) => [...projectKeys.lists(), params] as const,
	allList: () => [...projectKeys.all, "all-list"] as const,
	details: () => [...projectKeys.all, "detail"] as const,
	detail: (projectId: string) => [...projectKeys.details(), projectId] as const,
};

export const projectQueries = {
	baseKey: projectKeys.all,
	list: (params?: ProjectListInput) => {
		const mergedParams = {
			sort_by: PROJECT_LIST_SORT,
			size: PROJECT_LIST_SIZE,
			...params,
		} satisfies ProjectListInput;

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
