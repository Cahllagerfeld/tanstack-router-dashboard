import { queryOptions } from "@tanstack/react-query";
import { UserListQueryParams } from "@/types/user";
import { fetchCurrentUser } from "./fetch-current-user";
import { fetchUserList } from "./fetch-list";

const baseKey = "users" as const;

export const userKeys = {
	all: [baseKey] as const,
	lists: () => [...userKeys.all, "list"] as const,
	list: (params: UserListQueryParams) => [...userKeys.lists(), params] as const,
	details: () => [...userKeys.all, "detail"] as const,
	detail: (userId: string) => [...userKeys.details(), userId] as const,
	current: () => [...userKeys.all, "current"] as const,
};

export const userQueries = {
	baseKey: userKeys.all,
	list: (params?: UserListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies UserListQueryParams;

		return queryOptions({
			queryKey: userKeys.list(mergedParams),
			queryFn: () => fetchUserList(mergedParams),
		});
	},
	currentUser: () =>
		queryOptions({
			queryKey: userKeys.current(),
			queryFn: fetchCurrentUser,
		}),
};
