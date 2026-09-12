import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { type ApiClientError, apiClient, expectData } from "@/shared/api";
import type { Login, LoginSuccessResponse } from "@/types/session";

export async function loginUserRequest(body: Login) {
	const response = await apiClient.POST("/api/v1/login", {
		body: new URLSearchParams(body),
	});
	return expectData(response);
}

export function useLoginUser(
	options?: Omit<
		UseMutationOptions<LoginSuccessResponse, ApiClientError, Login, unknown>,
		"mutationFn"
	>
) {
	const mutation = useMutation({
		...options,
		mutationFn: loginUserRequest,
	});

	return {
		...mutation,
		loginUser: mutation.mutate,
		loginUserAsync: mutation.mutateAsync,
	};
}
