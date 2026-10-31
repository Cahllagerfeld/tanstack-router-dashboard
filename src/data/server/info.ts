import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

export async function fetchServerInfo() {
	const response = await apiClient.GET("/api/v1/info");
	const data = expectData(response);
	return data;
}
