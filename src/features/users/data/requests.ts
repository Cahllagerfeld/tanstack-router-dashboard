import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type {
	ActivateUserInput,
	InviteUserInput,
	UserListInput,
} from "../model";
import { invitedUserFromApi, userFromApi } from "./map";

export async function fetchUserList(params: UserListInput) {
	const response = await apiClient.GET("/api/v1/users", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), userFromApi);
}

/** Creating a user without a password leaves it inactive until it is activated. */
export async function inviteUser(input: InviteUserInput) {
	const response = await apiClient.POST("/api/v1/users", {
		body: { ...input, full_name: "", active: false },
	});
	return invitedUserFromApi(expectData(response));
}

export async function activateUser({ userId, body }: ActivateUserInput) {
	const response = await apiClient.PUT(
		"/api/v1/users/{user_name_or_id}/activate",
		{
			params: { path: { user_name_or_id: userId } },
			body,
		}
	);
	return userFromApi(expectData(response));
}
