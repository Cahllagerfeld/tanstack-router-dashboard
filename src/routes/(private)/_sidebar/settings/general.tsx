import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/settings/general")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "General Settings" }],
	}),
});

function RouteComponent() {
	return <div>Hello "/(private)/_unscoped/settings/general"!</div>;
}
