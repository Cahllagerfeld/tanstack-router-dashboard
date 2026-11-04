import { createFileRoute } from "@tanstack/react-router";

import { PipelinesLayout } from "@/app/layouts/pipelines-layout";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/pipelines"
)({
	loader: () => ({ crumb: m.pipelines_navigation_label() }),
	component: RouteComponent,
});

function RouteComponent() {
	const { project_id } = Route.useParams();

	return <PipelinesLayout projectId={project_id} />;
}
