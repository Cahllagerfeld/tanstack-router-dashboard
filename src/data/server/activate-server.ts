import { ServerActivation } from "@/types/server";
import { User } from "@/types/user";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";
import { loginUser } from "../session/login";

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

async function activateAndLogin(bodyData: ServerActivation) {
	const activateResponse = await activateServer(bodyData);
	if (bodyData.admin_password && bodyData.admin_username) {
		await loginUser({
			password: bodyData.admin_password,
			username: bodyData.admin_username,
		});
	}

	return activateResponse;
}

export function useServerActivation(
	options?: UseMutationOptions<User | null, Error, ServerActivation>
) {
	return useMutation({
		...options,
		mutationFn: activateAndLogin,
	});
}
