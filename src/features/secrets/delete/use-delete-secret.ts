import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { secretKeys } from "../data/queries";
import { deleteSecret } from "../data/requests";

type Options = {
	onDeleted: () => void;
};

export function useDeleteSecret({ onDeleted }: Options) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteSecret,
		onSuccess: async () => {
			// The alert stays open until the lists refresh, so the deleted row
			// is gone when it closes.
			await queryClient.invalidateQueries({ queryKey: secretKeys.lists() });
			toast.success(m.secrets_delete_success());
			onDeleted();
		},
		onError: (err) => {
			toast.error(err.message || m.secrets_delete_failed());
		},
	});
}
