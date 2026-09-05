import { apiClient, expectData } from "@/shared/api";

export async function fetchServerInfo() {
	const response = await apiClient.GET("/api/v1/info");
	const data = expectData(response);
	return data;
}
