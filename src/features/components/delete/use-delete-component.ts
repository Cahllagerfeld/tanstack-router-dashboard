import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { componentKeys } from "../data/queries";
import { deleteComponent } from "../data/requests";

type Options = {
	onDeleted: () => unknown;
};

export function useDeleteComponent({ onDeleted }: Options) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteComponent,
		onSuccess: async (_data, { componentId }) => {
			// Every list refreshes before leaving a Detail Screen, so the one it
			// returns to never shows the deleted row. The detail query goes last:
			// an open Detail Screen would otherwise refetch the deleted Component.
			await queryClient.invalidateQueries({
				queryKey: componentKeys.lists(),
				refetchType: "all",
			});
			toast.success(m.components_delete_success());
			await onDeleted();
			queryClient.removeQueries({
				queryKey: componentKeys.detail(componentId),
			});
		},
		onError: (err) => {
			toast.error(err.message || m.components_delete_failed());
		},
	});
}
