import { ServerSettings } from "@/types/server";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";

export async function fetchServerSettings(): Promise<ServerSettings> {
	const data = await apiClient<ServerSettings>(apiPaths.settings);
	return data;
}
