import { expectData } from "@/lib/fetch-error";
import { apiClient } from "../api-client";

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
	return expectData(response);
}
