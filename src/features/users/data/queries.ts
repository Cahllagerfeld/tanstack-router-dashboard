import { queryOptions } from "@tanstack/react-query";

import type { UserListInput } from "../model";
import { fetchUserList } from "./requests";

const baseKey = "users" as const;

export const userKeys = {
	all: [baseKey] as const,
	lists: () => [...userKeys.all, "list"] as const,
	list: (params: UserListInput) => [...userKeys.lists(), params] as const,
	details: () => [...userKeys.all, "detail"] as const,
	detail: (userId: string) => [...userKeys.details(), userId] as const,
};

export const userQueries = {
	baseKey: userKeys.all,
	list: (params?: UserListInput) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies UserListInput;

		return queryOptions({
			queryKey: userKeys.list(mergedParams),
			queryFn: () => fetchUserList(mergedParams),
		});
	},
};
