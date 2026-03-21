import { expectData } from "@/lib/fetch-error";
import { UserListQueryParams } from "@/types/user";
import { apiClient } from "../api-client";

export async function fetchUserList(params: UserListQueryParams) {
	const response = await apiClient.GET("/api/v1/users", {
		params: {
			query: params,
		},
	});
	return expectData(response);
}
