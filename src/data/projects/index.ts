import { createResourceQueries } from "../query-factory";
import { apiPaths } from "../api";
import { Project, ProjectList, ProjectListQueries } from "@/types/projects";

export const projectQueries = createResourceQueries<
	ProjectList,
	Project,
	ProjectListQueries
>({
	baseKey: "projects",
	endpoints: {
		base: apiPaths.projects.base,
		detail: apiPaths.projects.detail,
	},
	defaultListParams: {
		sort_by: "desc:created",
		size: 10,
	},
});
