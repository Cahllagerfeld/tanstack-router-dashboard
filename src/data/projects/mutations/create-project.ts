import { getProjectDisplayName } from "@/lib/names";
import { CreateProject, Project } from "@/types/projects";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { apiClient } from "../../api-client";
import { expectData } from "@/lib/fetch-error";
import { ApiClientError } from "@/types/api";

async function createProject(payload: CreateProject) {
	const project = await apiClient.POST("/api/v1/projects", {
		method: "POST",
		body: payload,
	});

	return expectData(project);
}

export function useCreateProject(
	options?: UseMutationOptions<Project, ApiClientError, CreateProject, unknown>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, ...rest } = options || {};
	return useMutation<Project, ApiClientError, CreateProject, unknown>({
		...rest,
		mutationFn: createProject,
		onSuccess: (data, variables, onMutateResult, context) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success(`Project ${getProjectDisplayName(data)} created`);
			navigate({
				to: "/projects/$project_id",
				params: { project_id: data.name },
			});
			onSuccess?.(data, variables, onMutateResult, context);
		},
	});
}
