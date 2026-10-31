import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { UserListInput } from "../model";
import { userFromApi } from "./map";

export async function fetchUserList(params: UserListInput) {
	const response = await apiClient.GET("/api/v1/users", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), userFromApi);
}
