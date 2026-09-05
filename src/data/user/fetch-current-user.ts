import { userFromApi } from "@/domain/users";
import { apiClient, expectData } from "@/shared/api";

export async function fetchCurrentUser() {
	const response = await apiClient.GET("/api/v1/current-user");
	return userFromApi(expectData(response));
}
