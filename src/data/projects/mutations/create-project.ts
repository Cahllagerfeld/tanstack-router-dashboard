import { getProjectDisplayName } from "@/lib/names";
import { CreateProject, Project } from "@/types/projects";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { apiPaths } from "../../api";
import { apiClient } from "../../api-client";

async function createProject(payload: CreateProject) {
	const project: Project = await apiClient(apiPaths.projects.base, {
		method: "POST",
		body: JSON.stringify(payload),
	});

	return project;
}

export function useCreateProject(
	options?: UseMutationOptions<Project, unknown, CreateProject, unknown>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, ...rest } = options || {};
	return useMutation<Project, unknown, CreateProject, unknown>({
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
