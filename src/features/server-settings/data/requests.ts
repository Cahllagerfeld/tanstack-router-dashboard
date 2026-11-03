import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

import type { ServerSettingsUpdateInput } from "../model";
import { serverSettingsFromApi } from "./map";

export async function fetchServerSettings() {
	const response = await apiClient.GET("/api/v1/settings");
	return serverSettingsFromApi(expectData(response));
}

export async function updateServerSettings(body: ServerSettingsUpdateInput) {
	const response = await apiClient.PUT("/api/v1/settings", { body });
	return serverSettingsFromApi(expectData(response));
}
