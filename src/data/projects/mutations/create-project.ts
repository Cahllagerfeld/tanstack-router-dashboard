import {
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import {
	type CreateProjectInput,
	createProject,
	type Project,
	projectKeys,
} from "@/features/projects";
import { m } from "@/paraglide/messages";
import type { ApiClientError } from "@/types/api";

export function useCreateProject(
	options?: UseMutationOptions<
		Project,
		ApiClientError,
		CreateProjectInput,
		unknown
	>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, ...rest } = options || {};
	return useMutation<Project, ApiClientError, CreateProjectInput, unknown>({
		...rest,
		mutationFn: createProject,
		onSuccess: (data, variables, onMutateResult, context) => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			toast.success(
				m.projects_notification_created({
					displayName: data.displayName ?? data.name,
				})
			);
			navigate({
				to: "/projects/$project_id",
				params: { project_id: data.name },
			});
			onSuccess?.(data, variables, onMutateResult, context);
		},
	});
}
