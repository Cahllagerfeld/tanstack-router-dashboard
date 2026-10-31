import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { userQueries } from "../data/queries";
import { deleteUser } from "../data/requests";

type Options = {
	onDeleted: () => void;
};

export function useDeleteUser({ onDeleted }: Options) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userQueries.baseKey });
			toast.success(m.users_delete_success());
			onDeleted();
		},
		onError: (err) => {
			toast.error(err.message || m.users_delete_failed());
		},
	});
}
