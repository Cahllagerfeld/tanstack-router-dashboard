import { apiClient } from "../api-client";
import { expectData } from "@/lib/fetch-error";

export async function fetchServerInfo() {
	const response = await apiClient.GET("/api/v1/info");
	const data = expectData(response);
	return data;
}
