import { ServerActivation } from "@/types/server";
import { apiPaths, axios } from "../api";
import { User } from "@/types/user";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

async function activateServer(body: ServerActivation) {
	const url = apiPaths.activate;
	const response = await axios.put<User | null>(url, body);
	return response.data;
}

export function useServerActivation(
	options?: UseMutationOptions<User | null, Error, ServerActivation>
) {
	return useMutation({
		...options,
		mutationFn: activateServer,
	});
}
