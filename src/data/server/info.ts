import { expectData } from "@/lib/fetch-error";
import { apiClient } from "../api-client";

export async function fetchServerInfo() {
	const response = await apiClient.GET("/api/v1/info");
	const data = expectData(response);
	return data;
}
