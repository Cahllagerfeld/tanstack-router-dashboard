import { serverQueries } from "@/data/server";
import { projectQueries } from "@/data/projects";
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guards";

export const Route = createFileRoute("/(private)/_scoped/projects/$project_id")(
	{
		beforeLoad: async ({ context: { queryClient } }) => {
			await requireAuth(queryClient);
		},
		loader: async ({ context: { queryClient }, params: { project_id } }) => {
			await Promise.all([
				queryClient.ensureQueryData(serverQueries.serverInfo()),
				queryClient.ensureQueryData(projectQueries.list()),
				queryClient.ensureQueryData(projectQueries.detail(project_id)),
			]);
		},
	}
);
