import { createFileRoute, redirect } from "@tanstack/react-router";

import { projectQueries } from "@/features/projects";
import { NoProjectsFallback } from "@/features/projects/ui";
import { getProjectFromLocalStorage, resolveProject } from "@/lib/projects";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/projects/")({
	loader: async ({ context: { queryClient } }) => {
		// Not ensureQueryData: a cached list could still contain a just-deleted Project.
		const { items } = await queryClient.fetchQuery(projectQueries.allList());
		const project = resolveProject(items, getProjectFromLocalStorage());
		if (project) {
			throw redirect({
				to: "/projects/$project_id",
				params: { project_id: project.name },
				replace: true,
			});
		}
	},
	head: () => ({
		meta: [{ title: m.projects_list_title() }],
	}),
	component: NoProjectsFallback,
});
