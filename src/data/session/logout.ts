import { expectData } from "@/lib/fetch-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { apiClient } from "../api-client";

export async function logoutUserRequest() {
	const response = await apiClient.GET("/api/v1/logout", {});
	const data = expectData(response);
	return data;
}

export function useLogoutUser() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation<unknown, unknown, void, unknown>({
		mutationFn: logoutUserRequest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["current-user"] });
			navigate({ to: "/login" });
		},
	});
}
