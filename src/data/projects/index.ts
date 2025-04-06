import { queryOptions } from "@tanstack/react-query";
import { fetchProjectList } from "./queries/projects-list";

export const projectQueries = {
	projectList: () =>
		queryOptions({
			queryKey: ["projects"],
			queryFn: fetchProjectList,
		}),
};
