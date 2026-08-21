import { userFromApi } from "@/domain/users";
import { expectData } from "@/lib/fetch-error";
import { apiClient } from "../api-client";

export async function fetchCurrentUser() {
	const response = await apiClient.GET("/api/v1/current-user");
	return userFromApi(expectData(response));
}
