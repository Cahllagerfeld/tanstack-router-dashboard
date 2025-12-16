import { stackQueries } from "@/data/stacks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(private)/_unscoped/components/$component_id/stacks"
)({
	loader: ({ context: { queryClient }, params: { component_id } }) => {
		return queryClient.ensureQueryData(stackQueries.list({ component_id }));
	},
});
