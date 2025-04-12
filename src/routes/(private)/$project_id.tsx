import { serverQueries } from "@/data/server";
import { projectQueries } from "@/data/projects";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/$project_id")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient } }) => {
		const [serverInfo] = await Promise.all([
			queryClient.ensureQueryData(serverQueries.serverInfo()),
			queryClient.ensureQueryData(projectQueries.projectList()),
		]);

		if (serverInfo.active === false)
			throw redirect({ to: "/server-activation" });
	},
});
