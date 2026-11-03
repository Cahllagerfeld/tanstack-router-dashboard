import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { stackKeys } from "../data/queries";
import { deleteStack } from "../data/requests";

type Options = {
	onDeleted: () => void;
};

export function useDeleteStack({ onDeleted }: Options) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteStack,
		onSuccess: async () => {
			// The alert stays open until the lists refresh, so the deleted row
			// is gone when it closes.
			await queryClient.invalidateQueries({ queryKey: stackKeys.lists() });
			toast.success(m.stacks_delete_success());
			onDeleted();
		},
		onError: (err) => {
			toast.error(err.message || m.stacks_delete_failed());
		},
	});
}
