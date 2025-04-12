import { queryOptions } from "@tanstack/react-query";
import { fetchProjectList } from "./queries/projects-list";
import { ProjectListQueries } from "@/types/projects";

export const projectQueries = {
	projectList: (queries: ProjectListQueries = {}) =>
		queryOptions({
			queryKey: ["projects", queries],
			queryFn: () => fetchProjectList({ queries }),
		}),
};
