import { apiPaths } from "@/data/api";
import { apiClient } from "@/data/api-client";
import { buildUrlWithQueries } from "@/lib/url";
import { UserList, UserListQueryParams } from "@/types/user";

type Config = {
	queries: UserListQueryParams;
};

export async function fetchUserList({ queries }: Config) {
	const url = buildUrlWithQueries(apiPaths.users.base, queries);
	const data = await apiClient<UserList>(url);

	return data;
}
