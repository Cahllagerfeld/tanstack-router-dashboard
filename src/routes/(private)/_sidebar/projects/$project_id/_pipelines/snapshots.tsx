import { createFileRoute } from "@tanstack/react-router";

import { type SnapshotListInput, snapshotQueries } from "@/features/snapshots";
import { SnapshotListScreen } from "@/features/snapshots/ui";
import { m } from "@/paraglide/messages";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/_pipelines/snapshots"
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
		} satisfies SnapshotListInput;

		await queryClient.ensureQueryData(snapshotQueries.list(queryParams));
		return {
			queryParams,
			crumb: m.snapshots_navigation_label(),
		};
	},
	head: () => ({
		meta: [{ title: m.snapshots_list_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { queryParams } = Route.useLoaderData();

	return <SnapshotListScreen params={queryParams} />;
}
