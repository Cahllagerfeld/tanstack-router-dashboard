import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_unscoped/settings/general")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(private)/_unscoped/settings/general"!</div>;
}
