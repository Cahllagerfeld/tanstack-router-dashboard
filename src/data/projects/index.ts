import { queryOptions } from "@tanstack/react-query";
import { fetchProjectList } from "./queries/projects-list";
import { ProjectListQueries } from "@/types/projects";
import { fetchProjectDetail } from "./queries/project-detail";

export const projectQueries = {
	projectList: (queries: ProjectListQueries = {}) => {
		const defaultQueries: ProjectListQueries = {
			sort_by: "desc:created",
			size: 10,
		};
		const finalQueries = { ...defaultQueries, ...queries };

		return queryOptions({
			queryKey: ["projects", finalQueries],
			queryFn: () => fetchProjectList({ queries: finalQueries }),
		});
	},

	projectDetail: (projectId: string) =>
		queryOptions({
			queryKey: ["projects", projectId],
			queryFn: () => fetchProjectDetail({ projectId }),
		}),
};
