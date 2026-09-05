import { queryOptions } from "@tanstack/react-query";

import { projectFromApi } from "@/domain/projects";
import { expectData } from "@/lib/fetch-error";
import type { ProjectListQueries } from "@/types/projects";

import { apiClient } from "../api-client";

const baseKey = "projects" as const;

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
	details: () => [...projectKeys.all, "detail"] as const,
	detail: (projectId: string) => [...projectKeys.details(), projectId] as const,
};

export const projectQueries = {
	baseKey: projectKeys.all,
	list: (params?: ProjectListQueries) => {
		const mergedParams = {
			sort_by: "desc:created",
			size: 10,
			...params,
		} satisfies ProjectListQueries;

		return queryOptions({
			queryKey: projectKeys.list(mergedParams),
			queryFn: () => fetchProjectList(mergedParams),
		});
	},
	detail: (projectId: string) =>
		queryOptions({
			queryKey: projectKeys.detail(projectId),
			queryFn: () => fetchProjectDetail(projectId),
		}),
};
