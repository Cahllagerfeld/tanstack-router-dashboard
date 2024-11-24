import { useMutation } from "@tanstack/react-query";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";
import { useAuth } from "@/context/auth";
import { useNavigate } from "@tanstack/react-router";
import { sleep } from "@/lib/sleep";

async function performLogout() {
	const res = await apiClient<string>(apiPaths.logout);
	return res;
}

export function useLogoutUser() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: performLogout,
		onSuccess: async () => {
			logout();
			await sleep(50);
			navigate({ to: "/login" });
		},
	});
}
