import { queryOptions } from "@tanstack/react-query";
import { createResourceQueries } from "../query-factory";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";
import { User, UserList, UserListQueryParams } from "@/types/user";

const baseUserQueries = createResourceQueries<
	UserList,
	User,
	UserListQueryParams
>({
	baseKey: "users",
	endpoints: {
		base: apiPaths.users.base,
	},
	defaultListParams: {
		sort_by: "desc:created",
	},
});

export const userQueries = {
	...baseUserQueries,
	/** Special query for the currently authenticated user */
	currentUser: () =>
		queryOptions({
			queryKey: ["current-user"],
			queryFn: () => apiClient<User>(apiPaths.users.currentUser),
		}),
};
