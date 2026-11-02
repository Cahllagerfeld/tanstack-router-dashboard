import { createFileRoute, redirect } from "@tanstack/react-router";

import {
	getProjectFromLocalStorage,
	projectQueries,
	resolveProject,
} from "@/features/projects";

export const Route = createFileRoute("/(private)/_sidebar/settings/projects/")({
	loader: async ({ context: { queryClient } }) => {
		// Not ensureQueryData: a cached list could still contain a just-deleted Project.
		const { items } = await queryClient.fetchQuery(projectQueries.allList());
		const project = resolveProject(items, getProjectFromLocalStorage());
		if (!project) throw redirect({ to: "/settings/general", replace: true });
		throw redirect({
			to: "/settings/projects/$project_id/general",
			params: { project_id: project.name },
			replace: true,
		});
	},
});
