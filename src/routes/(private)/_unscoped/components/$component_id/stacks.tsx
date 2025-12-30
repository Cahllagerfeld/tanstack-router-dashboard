import { stackQueries } from "@/data/stacks";
import { createFileRoute } from "@tanstack/react-router";
import { ComponentStacksTab } from "@/features/components/detail/stacks-tab";

export const Route = createFileRoute(
	"/(private)/_unscoped/components/$component_id/stacks"
)({
	loader: ({ context: { queryClient }, params: { component_id } }) => {
		return queryClient.ensureQueryData(stackQueries.list({ component_id }));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { component_id } = Route.useParams();

	return <ComponentStacksTab componentId={component_id} />;
}
