import { createFileRoute } from "@tanstack/react-router";

import { stackQueries } from "@/features/stacks";
import { RelatedStackList } from "@/features/stacks/ui";

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

	return <RelatedStackList componentId={component_id} />;
}
