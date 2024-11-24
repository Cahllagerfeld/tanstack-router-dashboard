import { queryOptions } from "@tanstack/react-query";
import { fetchCurrentUser } from "./current-user";

export const UserQueries = {
	currentUser: () =>
		queryOptions({
			queryKey: ["current-user"],
			queryFn: fetchCurrentUser,
		}),
};
