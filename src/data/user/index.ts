import { queryOptions } from "@tanstack/react-query";
import { fetchCurrentUser } from "./current-user";
import { fetchUserList } from "./queries/user-list";
import { UserListQueryParams } from "@/types/user";

export const userQueries = {
	usersBaseKey: ["users"] as const,
	currentUser: () =>
		queryOptions({
			queryKey: ["current-user"],
			queryFn: fetchCurrentUser,
		}),
	userList: (queries: UserListQueryParams) =>
		queryOptions({
			queryKey: [...userQueries.usersBaseKey, queries],
			queryFn: () => fetchUserList({ queries }),
		}),
};
