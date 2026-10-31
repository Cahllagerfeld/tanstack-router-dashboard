import { useSuspenseQuery } from "@tanstack/react-query";
import { useMatch } from "@tanstack/react-router";

import { projectQueries } from "@/features/projects";
import {
	getProjectFromLocalStorage,
	resolveUnscopedProject,
} from "@/lib/projects";

/**
 * The Project validated by the current Project route, otherwise the one the app
 * would open by default. A Project route never falls back to another Project.
 */
export function useActiveProject() {
	const { data, isError, isFetching } = useSuspenseQuery(
		projectQueries.allList()
	);
	const projectMatch = useMatch({
		from: "/(private)/_sidebar/projects/$project_id",
		shouldThrow: false,
	});
	const routeProject =
		projectMatch?.status === "success"
			? projectMatch.loaderData?.project
			: undefined;

	return {
		projects: data.items,
		activeProject: projectMatch
			? routeProject
			: resolveUnscopedProject(
					data.items,
					getProjectFromLocalStorage(),
					!isError && !isFetching
				),
	};
}
