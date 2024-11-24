import { workspaceQueries } from "@/data/workspaces";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/")({
	loader: async ({ context }) => {
		const workspaces = await context.queryClient.ensureQueryData(
			workspaceQueries.workspaceList()
		);

		const defaultWorkspace = workspaces?.items.find(
			(w) => w.name === "default"
		);
		if (!defaultWorkspace) throw redirect({ to: "/login" });
		throw redirect({
			to: "/$workspace_id",
			params: { workspace_id: defaultWorkspace.id },
		});
	},
});
