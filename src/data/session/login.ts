import { apiPaths, axios } from "@/data/api";
import { Login, LoginTokenResponse } from "@/types/session";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export async function loginUser(body: Login) {
	const url = apiPaths.login;
	const response = await axios.post<LoginTokenResponse>(
		url,
		new URLSearchParams(body)
	);

	return response.data;
}

export function useLoginUser(
	options?: UseMutationOptions<LoginTokenResponse, unknown, Login>
) {
	return useMutation<LoginTokenResponse, unknown, Login>({
		...options,
		mutationFn: async (payload) => {
			return loginUser(payload);
		},
	});
}
