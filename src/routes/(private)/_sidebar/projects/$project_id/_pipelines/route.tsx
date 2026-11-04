import { createFileRoute } from "@tanstack/react-router";

import { PipelinesLayout } from "@/app/layouts/pipelines-layout";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/_pipelines"
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { project_id } = Route.useParams();

	return <PipelinesLayout projectId={project_id} />;
}
