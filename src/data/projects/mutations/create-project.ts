import {
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import type { Project } from "@/domain/projects";
import { projectFromApi } from "@/domain/projects";
import { m } from "@/paraglide/messages";
import { type ApiClientError, apiClient, expectData } from "@/shared/api";
import type { ApiCreateProject } from "@/types/projects";

import { projectKeys } from "..";

export async function createProject(payload: ApiCreateProject) {
	const project = await apiClient.POST("/api/v1/projects", {
		method: "POST",
		body: payload,
	});

	return projectFromApi(expectData(project));
}

export function useCreateProject(
	options?: UseMutationOptions<
		Project,
		ApiClientError,
		ApiCreateProject,
		unknown
	>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, ...rest } = options || {};
	return useMutation<Project, ApiClientError, ApiCreateProject, unknown>({
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
