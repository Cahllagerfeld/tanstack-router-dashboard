import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { loginUserRequest } from "@/features/session";
import type { ApiClientError } from "@/shared/api/errors";

import { activateServer } from "../data/requests";
import type { ServerActivationInput } from "../model";

export async function activateAndLogin(input: ServerActivationInput) {
	await activateServer(input);
	if (input.admin_password && input.admin_username) {
		await loginUserRequest({
			password: input.admin_password,
			username: input.admin_username,
		});
	}
}

export function useServerActivation(
	options?: UseMutationOptions<
		void,
		ApiClientError,
		ServerActivationInput,
		unknown
	>
) {
	return useMutation<void, ApiClientError, ServerActivationInput, unknown>({
		...options,
		mutationFn: activateAndLogin,
	});
}
