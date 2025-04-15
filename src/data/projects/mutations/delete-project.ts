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
	options?: UseMutationOptions<void, FetchError, DeleteProjectParams>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, onError, ...rest } = options || {};
	return useMutation<void, FetchError, DeleteProjectParams, unknown>({
		...rest,
		mutationFn: async ({ projectId }: DeleteProjectParams) => {
			await deleteProject({ projectId });
		},
		onSuccess: (data, vars, ctx) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success(`Project deleted`);
			navigate({
				to: "/projects",
			});
			onSuccess?.(data, vars, ctx);
		},
		onError: (error, vars, ctx) => {
			toast.error(error.message);
			onError?.(error, vars, ctx);
		},
	});
}
