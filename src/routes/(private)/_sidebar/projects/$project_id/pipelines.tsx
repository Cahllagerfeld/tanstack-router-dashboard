import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(private)/_sidebar/projects/$project_id/pipelines"
)({
	loader: () => {
		return {
			crumb: "Pipelines",
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(private)/_sidebar/projects/$project_id/pipelines"!</div>;
}
