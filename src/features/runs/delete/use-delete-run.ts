import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { runKeys } from "../data/queries";
import { deleteRun } from "../data/requests";

type Options = {
	onDeleted: () => void;
};

export function useDeleteRun({ onDeleted }: Options) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteRun,
		onSuccess: async () => {
			// The alert stays open until the lists refresh, so the deleted row
			// is gone when it closes.
			await queryClient.invalidateQueries({ queryKey: runKeys.lists() });
			toast.success(m.runs_delete_success());
			onDeleted();
		},
		onError: (err) => {
			toast.error(err.message || m.runs_delete_failed());
		},
	});
}
