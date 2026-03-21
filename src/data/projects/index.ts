import { ProjectListQueries } from "@/types/projects";
import { queryOptions } from "@tanstack/react-query";
import { fetchProjectDetail } from "./fetch-detail";
import { fetchProjectList } from "./fetch-list";

const baseKey = "projects" as const;

export const projectQueries = {
	baseKey: [baseKey] as const,
	list: (params?: ProjectListQueries) => {
		const mergedParams = {
			sort_by: "desc:created",
			size: 10,
			...params,
		} satisfies ProjectListQueries;

		return queryOptions({
			queryKey: [baseKey, mergedParams] as const,
			queryFn: () => fetchProjectList(mergedParams),
		});
	},
	detail: (projectId: string) =>
		queryOptions({
			queryKey: [baseKey, projectId] as const,
			queryFn: () => fetchProjectDetail(projectId),
		}),
};
