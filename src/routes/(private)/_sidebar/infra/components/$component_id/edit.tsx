import { createFileRoute } from "@tanstack/react-router";

import { componentQueries } from "@/features/components";
import { EditComponentFlow } from "@/features/components/ui";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute(
	"/(private)/_sidebar/infra/components/$component_id/edit"
)({
	loader: async ({ context: { queryClient }, params: { component_id } }) => {
		// The parent route already loaded the Component and owns its not-found state.
		const component = await queryClient.ensureQueryData(
			componentQueries.detail(component_id)
		);
		if (component.flavor)
			await queryClient.ensureQueryData(
				componentQueries.flavorDetail(component.flavor.id)
			);
		return { component, crumb: m.components_edit_crumb() };
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData
					? m.components_edit_route_title({ name: loaderData.component.name })
					: m.components_not_found_title(),
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { component_id } = Route.useParams();

	return <EditComponentFlow componentId={component_id} />;
}
