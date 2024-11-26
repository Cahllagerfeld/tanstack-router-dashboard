import { serverQueries } from "@/data/server";
import { workspaceQueries } from "@/data/workspaces";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/$workspace_id")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient } }) => {
		const [serverInfo] = await Promise.all([
			queryClient.ensureQueryData(serverQueries.serverInfo()),
			queryClient.ensureQueryData(workspaceQueries.workspaceList()),
		]);

		if (serverInfo.active === false)
			throw redirect({ to: "/server-activation" });
	},
});
