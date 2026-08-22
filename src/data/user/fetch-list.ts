import { apiClient } from "../api-client";
import { userFromApi } from "@/domain/users";
import { expectData } from "@/lib/fetch-error";
import type { UserListQueryParams } from "@/types/user";

export async function fetchUserList(params: UserListQueryParams) {
	const response = await apiClient.GET("/api/v1/users", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(userFromApi),
	};
}
