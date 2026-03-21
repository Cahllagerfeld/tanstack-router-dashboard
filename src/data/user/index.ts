import { queryOptions } from "@tanstack/react-query";
import { UserListQueryParams } from "@/types/user";
import { fetchCurrentUser } from "./fetch-current-user";
import { fetchUserList } from "./fetch-list";

const baseKey = "users" as const;

export const userQueries = {
	baseKey: [baseKey] as const,
	list: (params?: UserListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies UserListQueryParams;

		return queryOptions({
			queryKey: [baseKey, mergedParams] as const,
			queryFn: () => fetchUserList(mergedParams),
		});
	},
	currentUser: () =>
		queryOptions({
			queryKey: ["current-user"],
			queryFn: fetchCurrentUser,
		}),
};
