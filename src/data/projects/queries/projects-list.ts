import { buildUrlWithQueries } from "@/lib/url";
import { ProjectList, ProjectListQueries } from "@/types/projects";
import { apiPaths } from "../../api";
import { apiClient } from "../../api-client";

type Args = {
	queries: ProjectListQueries;
};

export async function fetchProjectList({ queries }: Args) {
	const defaultQueries: ProjectListQueries = {
		sort_by: "desc:created",
	};

	const url = buildUrlWithQueries(apiPaths.projects.base, {
		...defaultQueries,
		...queries,
	});
	const data = await apiClient<ProjectList>(url);
	return data;
}
