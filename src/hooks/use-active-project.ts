import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import { projectQueries } from "@/data/projects";
import { getProjectFromLocalStorage, resolveProject } from "@/lib/projects";

/** The Project in the URL, otherwise the one the app would open by default. */
export function useActiveProject() {
	const { data } = useSuspenseQuery(projectQueries.list());
	const projectRouteParams = useParams({
		from: "/(private)/_sidebar/projects/$project_id",
		shouldThrow: false,
	});

	return {
		projects: data.items,
		activeProject: resolveProject(
			data.items,
			projectRouteParams?.project_id ?? getProjectFromLocalStorage()
		),
	};
}
