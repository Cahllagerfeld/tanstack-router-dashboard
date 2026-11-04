import { createFileRoute } from "@tanstack/react-router";

import { pipelineQueries } from "@/features/pipelines";
import { PipelineListScreen } from "@/features/pipelines/ui";
import { commonFilterSchema } from "@/shared/filters/common-filter-schema";

const querySchema = commonFilterSchema;

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/pipelines/"
)({
	validateSearch: querySchema,
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
		};

		await queryClient.ensureQueryData(pipelineQueries.list(queryParams));
		return { queryParams };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { queryParams } = Route.useLoaderData();

	return <PipelineListScreen params={queryParams} />;
}
