import { ServerActivation } from "@/types/server";
import { apiPaths } from "../api";
import { User } from "@/types/user";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";

async function activateServer(bodyData: ServerActivation) {
	const response = await apiClient<User>(apiPaths.activate, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bodyData),
	});

	return response;
}

export function useServerActivation(
	options?: UseMutationOptions<User | null, Error, ServerActivation, unknown>
) {
	return useMutation<User | null, Error, ServerActivation, unknown>({
		...options,
		mutationFn: activateServer,
	});
}
