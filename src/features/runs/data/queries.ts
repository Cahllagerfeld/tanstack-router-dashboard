import { queryOptions } from "@tanstack/react-query";

import type { ProjectRunListInput } from "../model";
import { fetchRunList } from "./requests";

const baseKey = "runs" as const;

const runKeys = {
	all: [baseKey] as const,
	lists: () => [...runKeys.all, "list"] as const,
	list: (params: ProjectRunListInput) => [...runKeys.lists(), params] as const,
};

export const runQueries = {
	list: (params: ProjectRunListInput) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies ProjectRunListInput;

		return queryOptions({
			queryKey: runKeys.list(mergedParams),
			queryFn: () => fetchRunList(mergedParams),
		});
	},
};
