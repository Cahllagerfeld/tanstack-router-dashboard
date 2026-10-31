import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";

import { componentKeys } from "../data/queries";
import { deleteComponent } from "../data/requests";

type Options = {
	onDeleted: () => void;
};

export function useDeleteComponent({ onDeleted }: Options) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: deleteComponent,
		onSuccess: async (_data, { componentId }) => {
			await queryClient.invalidateQueries({ queryKey: componentKeys.lists() });
			toast.success(m.components_delete_success());
			await navigate({ to: "/infra/components" });
			// This screen observes the detail query until it has left, and a refetch
			// of the deleted record could only fail.
			queryClient.removeQueries({
				queryKey: componentKeys.detail(componentId),
			});
			onDeleted();
		},
		onError: (err) => {
			toast.error(err.message || m.components_delete_failed());
		},
	});
}
