import { createFileRoute } from "@tanstack/react-router";

import { ComponentStacksTab } from "@/features/components/ui";
import { stackQueries } from "@/features/stacks";

export const Route = createFileRoute(
	"/(private)/_sidebar/infra/components/$component_id/stacks"
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
