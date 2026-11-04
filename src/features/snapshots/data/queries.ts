import { queryOptions } from "@tanstack/react-query";

import type { SnapshotListInput } from "../model";
import { fetchSnapshotList } from "./requests";

const baseKey = "snapshots" as const;

export const snapshotKeys = {
	all: [baseKey] as const,
	lists: () => [...snapshotKeys.all, "list"] as const,
	list: (params: SnapshotListInput) =>
		[...snapshotKeys.lists(), params] as const,
};

export const snapshotQueries = {
	list: (params: SnapshotListInput) => {
		const mergedParams = {
			sort_by: "desc:created",
			hydrate: true,
			...params,
		} satisfies SnapshotListInput;

		return queryOptions({
			queryKey: snapshotKeys.list(mergedParams),
			queryFn: () => fetchSnapshotList(mergedParams),
		});
	},
};
