import { useSuspenseQuery } from "@tanstack/react-query";
import { useMatch } from "@tanstack/react-router";

import { projectQueries } from "../data/queries";
import { resolveUnscopedProject } from "./model";
import { getProjectFromLocalStorage } from "./storage";

/**
 * The Project validated by the current Project route or Project settings route,
 * otherwise the one the app would open by default. A Project-scoped route never
 * falls back to another Project.
 */
export function useActiveProject() {
	const { data, isError, isFetching } = useSuspenseQuery(
		projectQueries.allList()
	);
	const projectMatch = useMatch({
		from: "/(private)/_sidebar/projects/$project_id",
		shouldThrow: false,
	});
	const settingsMatch = useMatch({
		from: "/(private)/_sidebar/settings/projects/$project_id",
		shouldThrow: false,
	});
	const scopedMatch = projectMatch ?? settingsMatch;
	const routeProject =
		scopedMatch?.status === "success"
			? scopedMatch.loaderData?.project
			: undefined;

	return {
		projects: data.items,
		activeProject: scopedMatch
			? routeProject
			: resolveUnscopedProject(
					data.items,
					getProjectFromLocalStorage(),
					!isError && !isFetching
				),
	};
}
