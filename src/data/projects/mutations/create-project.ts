import { CreateProject, Project } from "@/types/projects";
import { apiPaths } from "../../api";
import { apiClient } from "../../api-client";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

async function createProject(payload: CreateProject) {
	const project: Project = await apiClient(apiPaths.projects.base, {
		method: "POST",
		body: JSON.stringify(payload),
	});

	return project;
}

export function useCreateProject(
	options?: UseMutationOptions<Project, unknown, CreateProject>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, ...rest } = options || {};
	return useMutation({
		...rest,
		mutationFn: createProject,
		onSuccess: (data, vars, ctx) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success(`Project ${data.name} created`);
			navigate({ to: "/$project_id", params: { project_id: data.id } });
			onSuccess?.(data, vars, ctx);
		},
	});
}
