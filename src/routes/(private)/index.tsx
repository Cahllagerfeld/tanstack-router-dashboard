import { workspaceQueries } from "@/data/workspaces";
import { getWorkspaceFromLocalStorage } from "@/lib/workspaces";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/")({
	loader: async ({ context }) => {
		const workspaces = await context.queryClient.ensureQueryData(
			workspaceQueries.workspaceList()
		);
		const { items: workspaceItems } = workspaces;
		const localWorkspaceId = getWorkspaceFromLocalStorage();
		const selectedWorkspace = workspaceItems.find(
			(workspace) => workspace.id === localWorkspaceId
		);
		if (selectedWorkspace) {
			throw redirect({
				to: "/$workspace_id",
				params: { workspace_id: selectedWorkspace.id },
			});
		}
		const defaultWorkspace = workspaceItems.find(
			(workspace) => workspace.name === "default"
		);
		if (!defaultWorkspace) {
			throw redirect({ to: "/login" });
		}
		throw redirect({
			to: "/$workspace_id",
			params: { workspace_id: defaultWorkspace.id },
		});
	},
});
