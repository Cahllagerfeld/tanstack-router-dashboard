import { createFileRoute, Outlet } from "@tanstack/react-router";

import { projectQueries } from "@/data/projects";
import { ProjectNotFound } from "@/features/projects/ui";
import { getIllustrationUrl } from "@/lib/images";
import { ensureQueryDataOr404 } from "@/lib/loader-utils";
import { getProjectLabel, setProjectToLocalStorage } from "@/lib/projects";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id"
)({
	loader: async ({
		context: { queryClient },
		params: { project_id },
		preload,
	}) => {
		const project = await ensureQueryDataOr404(
			queryClient.ensureQueryData(projectQueries.detail(project_id))
		);
		// Links preload on hover, which must not count as opening the Project.
		if (!preload) setProjectToLocalStorage(project.id);
		return {
			project,
			crumb: getProjectLabel(project),
			crumbImage: getIllustrationUrl(project.name),
		};
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
