import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(private)/$project_id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { project_id } = Route.useParams();
	return (
		<div>
			<div>Hello {project_id}</div>
		</div>
	);
}
