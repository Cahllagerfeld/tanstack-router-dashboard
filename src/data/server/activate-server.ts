import { expectData } from "@/lib/fetch-error";
import { ApiClientError } from "@/types/api";
import { ApiServerActivationResult, ServerActivation } from "@/types/server";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { loginUserRequest } from "../session/login";

async function activateServer(bodyData: ServerActivation) {
	const response = await apiClient.PUT("/api/v1/activate", {
		body: bodyData,
	});

	return expectData(response);
}

async function activateAndLogin(bodyData: ServerActivation) {
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
