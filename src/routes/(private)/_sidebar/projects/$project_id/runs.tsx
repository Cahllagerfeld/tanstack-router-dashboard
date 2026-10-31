import { createFileRoute } from "@tanstack/react-router";

import { type ProjectRunListInput, runQueries } from "@/features/runs";
import { RunList } from "@/features/runs/ui";
import { m } from "@/paraglide/messages";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/runs"
)({
	validateSearch: commonFilterSchema,
	loaderDeps: ({ search: { page, size } }) => ({ page, size }),
	loader: async ({
		context: { queryClient },
		params: { project_id },
		deps: { page, size },
	}) => {
		const queryParams = {
			project: project_id,
			page,
			size,
		} satisfies ProjectRunListInput;

		await queryClient.ensureQueryData(runQueries.list(queryParams));
		return {
			queryParams,
			crumb: m.common_navigation_runs(),
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { queryParams } = Route.useLoaderData();

	return <RunList queries={queryParams} />;
}
