import { CreateWorkspace, Workspace } from "@/types/workspaces";
import { apiPaths } from "../../api";
import { apiClient } from "../../api-client";
import {
	useMutation,
	UseMutationOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

async function createWorkspace(payload: CreateWorkspace) {
	const workspace: Workspace = await apiClient(apiPaths.workspaces.base, {
		method: "POST",
		body: JSON.stringify(payload),
	});

	return workspace;
}

export function useCreateWorkspace(
	options?: UseMutationOptions<Workspace, unknown, CreateWorkspace>
) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { onSuccess, ...rest } = options || {};
	return useMutation({
		...rest,
		mutationFn: createWorkspace,
		onSuccess: (data, vars, ctx) => {
			queryClient.invalidateQueries({ queryKey: ["workspaces"] });
			toast.success(`Workspace ${data.name} created`);
			navigate({ to: "/$workspace_id", params: { workspace_id: data.id } });
			onSuccess?.(data, vars, ctx);
		},
	});
}
