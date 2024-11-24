import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(private)/$workspace_id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { workspace_id } = Route.useParams();
	return <div>Hello {workspace_id}</div>;
}
