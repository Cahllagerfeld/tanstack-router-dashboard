import { ComponentStacksTab } from "@/features/components/detail/stacks-tab";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
	"/(private)/_unscoped/components/$component_id/stacks"
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { component_id } = Route.useParams();

	return <ComponentStacksTab componentId={component_id} />;
}
