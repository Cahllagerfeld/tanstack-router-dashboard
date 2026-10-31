import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

import type { UserListInput, UserPage } from "../model";
import { userFromApi } from "./map";

export async function fetchUserList(params: UserListInput): Promise<UserPage> {
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
