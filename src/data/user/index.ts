import { queryOptions } from "@tanstack/react-query";
import { fetchCurrentUser } from "./queries/current-user";
import { fetchUserList } from "./queries/user-list";
import { UserListQueryParams } from "@/types/user";

export const userQueries = {
	usersBaseKey: ["users"] as const,
	currentUser: () =>
		queryOptions({
			queryKey: ["current-user"],
			queryFn: fetchCurrentUser,
		}),
	userList: (queries: UserListQueryParams) => {
		const defaultQueries: UserListQueryParams = {
			sort_by: "desc:created",
		};
		const finalQueries = { ...defaultQueries, ...queries };
		return queryOptions({
			queryKey: [...userQueries.usersBaseKey, finalQueries],
			queryFn: () => fetchUserList({ queries: finalQueries }),
		});
	},
};
