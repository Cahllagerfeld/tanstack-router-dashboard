import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { pipelineKeys } from "../data/queries";
import { deletePipeline } from "../data/requests";

type Options = {
	onDeleted: () => void;
};

export function useDeletePipeline({ onDeleted }: Options) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deletePipeline,
		onSuccess: async () => {
			// The alert stays open until the lists refresh, so the deleted row
			// is gone when it closes.
			await queryClient.invalidateQueries({ queryKey: pipelineKeys.lists() });
			toast.success(m.pipelines_delete_success());
			onDeleted();
		},
		onError: (err) => {
			toast.error(err.message || m.pipelines_delete_failed());
		},
	});
}
