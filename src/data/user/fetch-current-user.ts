import { userFromApi } from "@/domain/users";
import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

export async function fetchCurrentUser() {
	const response = await apiClient.GET("/api/v1/current-user");
	return userFromApi(expectData(response));
}
