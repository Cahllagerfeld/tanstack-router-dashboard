import { apiPaths } from "@/data/api";
import { Login, LoginTokenResponse } from "@/types/session";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export async function loginUser(body: Login) {
	const response = await apiClient<LoginTokenResponse>(apiPaths.login, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams(body),
	});
	return response;
}

export function useLoginUser(
	options?: UseMutationOptions<LoginTokenResponse, unknown, Login, unknown>
) {
	return useMutation<LoginTokenResponse, unknown, Login, unknown>({
		...options,
		mutationFn: async (payload) => {
			return loginUser(payload);
		},
	});
}
