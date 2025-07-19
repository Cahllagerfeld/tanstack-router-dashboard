import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
	"/(private)/_unscoped/settings/service-accounts/"
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(private)/_unscoped/settings/service-accounts/"!</div>;
}
