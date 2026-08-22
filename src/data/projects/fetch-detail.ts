import { apiClient } from "../api-client";
import { projectFromApi } from "@/domain/projects";
import { expectData } from "@/lib/fetch-error";

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
