import {
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { m } from "@/paraglide/messages";
import { FetchError } from "@/shared/api/errors";

import { projectKeys } from "../data/queries";
import { deleteProject } from "../data/requests";
import type { DeleteProjectInput } from "../model";

export function useDeleteProject(
	options?: UseMutationOptions<void, FetchError, DeleteProjectInput, unknown>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, onError, ...rest } = options || {};
	return useMutation<void, FetchError, DeleteProjectInput, unknown>({
		...rest,
		mutationFn: async ({ projectId }: DeleteProjectInput) => {
			await deleteProject({ projectId });
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			toast.success(m.projects_notification_deleted());
			navigate({
				to: "/projects",
			});
			onSuccess?.(data, variables, onMutateResult, context);
		},
		onError: (error, variables, onMutateResult, context) => {
			toast.error(error.message);
			onError?.(error, variables, onMutateResult, context);
		},
	});
}
