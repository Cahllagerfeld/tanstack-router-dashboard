import { expectData } from "@/lib/fetch-error";
import { ApiClientError } from "@/types/api";
import { ApiServerActivationResult, ServerActivation } from "@/types/server";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";

async function activateServer(bodyData: ServerActivation) {
	const response = await apiClient.PUT("/api/v1/activate", {
		body: bodyData,
	});

	return expectData(response);
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
		mutationFn: activateServer,
	});
}
