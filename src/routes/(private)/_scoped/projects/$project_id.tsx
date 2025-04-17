import { serverQueries } from "@/data/server";
import { projectQueries } from "@/data/projects";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_scoped/projects/$project_id")(
	{
		beforeLoad: ({ context }) => {
			if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
		},
		loader: async ({ context: { queryClient }, params: { project_id } }) => {
			await Promise.all([
				queryClient.ensureQueryData(serverQueries.serverInfo()),
				queryClient.ensureQueryData(projectQueries.projectList()),
				queryClient.ensureQueryData(projectQueries.projectDetail(project_id)),
			]);
		},
	}
);
