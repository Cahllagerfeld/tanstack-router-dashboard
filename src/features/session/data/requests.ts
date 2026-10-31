import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

import type { LoginInput } from "../model";
import { currentIdentityFromApi } from "./map";

export async function loginUserRequest(body: LoginInput) {
	const response = await apiClient.POST("/api/v1/login", {
		body: new URLSearchParams(body),
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	});
	return expectData(response);
}

export async function logoutUserRequest() {
	const response = await apiClient.GET("/api/v1/logout", {});
	const data = expectData(response);
	return data;
}

export async function fetchCurrentIdentity() {
	const response = await apiClient.GET("/api/v1/current-user");
	return currentIdentityFromApi(expectData(response));
}
