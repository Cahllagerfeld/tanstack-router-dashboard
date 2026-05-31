import { ProjectListQueries } from "@/types/projects";
import { queryOptions } from "@tanstack/react-query";
import { fetchProjectDetail } from "./fetch-detail";
import { fetchProjectList } from "./fetch-list";

const baseKey = "projects" as const;

export const projectKeys = {
	all: [baseKey] as const,
	lists: () => [...projectKeys.all, "list"] as const,
	list: (params: ProjectListQueries) =>
		[...projectKeys.lists(), params] as const,
	details: () => [...projectKeys.all, "detail"] as const,
	detail: (projectId: string) => [...projectKeys.details(), projectId] as const,
};

export const projectQueries = {
	baseKey: projectKeys.all,
	list: (params?: ProjectListQueries) => {
		const mergedParams = {
			sort_by: "desc:created",
			size: 10,
			...params,
		} satisfies ProjectListQueries;

		return queryOptions({
			queryKey: projectKeys.list(mergedParams),
			queryFn: () => fetchProjectList(mergedParams),
		});
	},
	detail: (projectId: string) =>
		queryOptions({
			queryKey: projectKeys.detail(projectId),
			queryFn: () => fetchProjectDetail(projectId),
		}),
};
