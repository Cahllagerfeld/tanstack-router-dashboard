import { createFileRoute, Outlet } from "@tanstack/react-router";

import { projectQueries } from "@/data/projects";
import { ProjectNotFound } from "@/features/projects/detail/project-not-found";
import { ensureQueryDataOr404 } from "@/lib/loader-utils";
import { m } from "@/paraglide/messages";

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
		if (!loaderData?.project)
			return { meta: [{ title: m.projects_detail_not_found_title() }] };
		return {
			meta: [
				{ title: m.projects_route_title({ name: loaderData.project.name }) },
			],
		};
	},
	notFoundComponent: ProjectNotFound,
	component: Outlet,
});
