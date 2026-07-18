import { projectQueries } from "@/data/projects";
import { ensureQueryDataOr404 } from "@/lib/loader-utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id"
)({
	loader: async ({ context: { queryClient }, params: { project_id } }) => {
		const project = await ensureQueryDataOr404(
			queryClient.ensureQueryData(projectQueries.detail(project_id))
		);
		return { project, crumb: project.name };
	},
	head({ loaderData }) {
		if (!loaderData?.project) return { meta: [{ title: "Project Not Found" }] };
		return {
			meta: [{ title: `Project ${loaderData.project.name}` }],
		};
	},
	notFoundComponent: () => <p>Project Not Found</p>,
	component: Outlet,
});
