import { pipelineQueries } from "@/data/pipelines";
import { PipelineListQueryParams } from "@/types/pipelines";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/pipelines"
)({
	loader: async ({ context: { queryClient }, params: { project_id } }) => {
		await queryClient.ensureQueryData(
			pipelineQueries.list({ project: project_id })
		);
		return {
			queryParams: { project: project_id } satisfies PipelineListQueryParams,
			crumb: "Pipelines",
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { queryParams } = Route.useLoaderData();
	const { data: pipelines } = useSuspenseQuery(
		pipelineQueries.list(queryParams)
	);
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Pipelines</h1>
				<p className="text-muted-foreground text-sm">
					Pipelines are DAGs of reusable steps for defining, versioning, and
					running machine learning workflows.
				</p>
			</div>
			<ul>
				{pipelines.items.map((pipeline) => (
					<li key={pipeline.id}>{pipeline.name}</li>
				))}
			</ul>
		</div>
	);
}
