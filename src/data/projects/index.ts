import { queryOptions } from "@tanstack/react-query";
import { fetchProjectList } from "./queries/projects-list";
import { ProjectListQueries } from "@/types/projects";
import { fetchProjectDetail } from "./queries/project-detail";

export const projectQueries = {
	projectList: (queries: ProjectListQueries = {}) =>
		queryOptions({
			queryKey: ["projects", queries],
			queryFn: () => fetchProjectList({ queries }),
		}),
	projectDetail: (projectId: string) =>
		queryOptions({
			queryKey: ["projects", projectId],
			queryFn: () => fetchProjectDetail({ projectId }),
		}),
};
