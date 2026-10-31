import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { sessionKeys } from "../data/queries";
import { logoutUserRequest } from "../data/requests";

export function useLogoutUser() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation<unknown, unknown, void, unknown>({
		mutationFn: logoutUserRequest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: sessionKeys.currentIdentity(),
			});
			navigate({ to: "/login" });
		},
	});
}
