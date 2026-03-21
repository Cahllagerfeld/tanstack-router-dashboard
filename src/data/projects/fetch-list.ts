import { projectFromApi } from "@/domain/projects";
import { expectData } from "@/lib/fetch-error";
import { ProjectListQueries } from "@/types/projects";
import { apiClient } from "../api-client";

export async function fetchProjectList(params: ProjectListQueries) {
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
