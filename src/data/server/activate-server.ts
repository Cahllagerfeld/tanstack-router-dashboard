import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { type ApiClientError, apiClient, expectData } from "@/shared/api";
import type {
	ApiServerActivationResult,
	ServerActivation,
} from "@/types/server";

import { loginUserRequest } from "../session/login";

async function activateServer(bodyData: ServerActivation) {
	const response = await apiClient.PUT("/api/v1/activate", {
		body: bodyData,
	});

	return expectData(response);
}

export async function activateAndLogin(bodyData: ServerActivation) {
	const activateResponse = await activateServer(bodyData);
	if (bodyData.admin_password && bodyData.admin_username) {
		await loginUserRequest({
			password: bodyData.admin_password,
			username: bodyData.admin_username,
		});
	}

	return activateResponse;
}

export function useServerActivation(
	options?: UseMutationOptions<
		ApiServerActivationResult,
		ApiClientError,
		ServerActivation,
		unknown
	>
) {
	return useMutation<
		ApiServerActivationResult,
		ApiClientError,
		ServerActivation,
		unknown
	>({
		...options,
		mutationFn: activateAndLogin,
	});
}
