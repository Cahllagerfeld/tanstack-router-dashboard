import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";
import { useNavigate } from "@tanstack/react-router";

async function performLogout() {
	const res = await apiClient<string>(apiPaths.logout);
	return res;
}

export function useLogoutUser() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation<string, unknown, void, unknown>({
		mutationFn: performLogout,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["current-user"] });
			navigate({ to: "/login" });
		},
	});
}
