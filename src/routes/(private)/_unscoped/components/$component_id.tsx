import { componentQueries } from "@/data/components";
import { createFileRoute } from "@tanstack/react-router";
import { ComponentDetailSkeleton } from "@/features/components/detail/component-detail-skeleton";
import { ensureQueryDataOr404 } from "@/lib/loader-utils";
import { ComponentNotFound } from "@/features/components/detail/component-not-found";

export const Route = createFileRoute(
	"/(private)/_unscoped/components/$component_id"
)({
	loader: async ({ context: { queryClient }, params: { component_id } }) => {
		const component = await ensureQueryDataOr404(
			queryClient.ensureQueryData(componentQueries.detail(component_id))
		);
		return { component };
	},
	head({ loaderData }) {
		if (!loaderData?.component)
			return { meta: [{ title: "Component Not Found" }] };
		return {
			meta: [{ title: `Component ${loaderData.component.name}` }],
		};
	},
	notFoundComponent: ComponentNotFound,
	pendingComponent: ComponentDetailSkeleton,
});
