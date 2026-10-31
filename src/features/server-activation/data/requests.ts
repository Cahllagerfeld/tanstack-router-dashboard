import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

import type { ServerActivationInput } from "../model";

export async function fetchServerInfo() {
	const response = await apiClient.GET("/api/v1/info");
	const data = expectData(response);
	return data;
}

export async function activateServer(body: ServerActivationInput) {
	const response = await apiClient.PUT("/api/v1/activate", { body });
	expectData(response);
}
