import { apiClient } from "@/shared/api/client";
import { expectData, expectOptionalData } from "@/shared/api/errors";

import type {
	CreateProjectInput,
	DeleteProjectInput,
	ProjectListInput,
	ProjectPage,
} from "../model";
import { projectFromApi } from "./map";

export async function fetchProjectList(
	params: ProjectListInput
): Promise<ProjectPage> {
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

export async function fetchProjectDetail(projectId: string) {
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

export async function createProject(payload: CreateProjectInput) {
	const project = await apiClient.POST("/api/v1/projects", {
		method: "POST",
		body: payload,
	});

	return projectFromApi(expectData(project));
}

export async function deleteProject({ projectId }: DeleteProjectInput) {
	const result = await apiClient.DELETE(
		"/api/v1/projects/{project_name_or_id}",
		{
			params: {
				path: {
					project_name_or_id: projectId,
				},
			},
		}
	);
	expectOptionalData(result);
}
