import { apiClient } from "../api-client";
import { projectFromApi } from "@/domain/projects";
import { expectData } from "@/lib/fetch-error";
import type { ProjectListQueries } from "@/types/projects";

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
