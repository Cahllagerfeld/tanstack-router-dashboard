import { createFileRoute, Outlet } from "@tanstack/react-router";

import {
	getIllustrationUrl,
	getProjectLabel,
	projectQueries,
	rememberOpenedProject,
} from "@/features/projects";
import { ProjectNotFound } from "@/features/projects/ui";
import { m } from "@/paraglide/messages";
import { ensureQueryDataOr404 } from "@/shared/routing/loader-utils";

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
		rememberOpenedProject(project.id, preload);
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
