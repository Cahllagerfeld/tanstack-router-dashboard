import { serverQueries } from "@/data/server";
import { projectQueries } from "@/data/projects";
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guards";
import { ensureQueryDataOr404 } from "@/lib/loader-utils";

export const Route = createFileRoute("/(private)/_scoped/projects/$project_id")(
	{
		beforeLoad: async ({ context: { queryClient } }) => {
			await requireAuth(queryClient);
		},
		loader: async ({ context: { queryClient }, params: { project_id } }) => {
			const [, , project] = await Promise.all([
				queryClient.ensureQueryData(serverQueries.serverInfo()),
				queryClient.ensureQueryData(projectQueries.list()),
				ensureQueryDataOr404(
					queryClient.ensureQueryData(projectQueries.detail(project_id))
				),
			]);
			return { project };
		},
		head({ loaderData }) {
			if (!loaderData?.project)
				return { meta: [{ title: "Project Not Found" }] };
			return {
				meta: [{ title: `Project ${loaderData.project.name}` }],
			};
		},
	}
);
