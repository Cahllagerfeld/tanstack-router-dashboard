import { apiPaths } from "@/data/api";
import { apiClient } from "@/data/api-client";
import { FetchError } from "@/lib/fetch-error";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

interface DeleteProjectParams {
	projectId: string;
}

export async function deleteProject({
	projectId,
}: DeleteProjectParams): Promise<void> {
	const url = apiPaths.projects.detail(projectId);
	await apiClient<void>(url, {
		method: "DELETE",
	});
}

export function useDeleteProject(
	options?: UseMutationOptions<void, FetchError, DeleteProjectParams, unknown>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, onError, ...rest } = options || {};
	return useMutation<void, FetchError, DeleteProjectParams, unknown>({
		...rest,
		mutationFn: async ({ projectId }: DeleteProjectParams) => {
			await deleteProject({ projectId });
		},
		onSuccess: (data, variables, onMutateResult, context) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success(`Project deleted`);
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
