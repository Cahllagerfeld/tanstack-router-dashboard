import { ServerInfo } from "@/types/server";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";

export async function fetchServerInfo(): Promise<ServerInfo> {
	const data = await apiClient<ServerInfo>(apiPaths.info);
	return data;
}
