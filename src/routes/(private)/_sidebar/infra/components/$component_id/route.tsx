import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { componentQueries } from "@/features/components";
import {
	ComponentDetailLayout,
	ComponentDetailSkeleton,
	ComponentNotFound,
} from "@/features/components/ui";
import { stackQueries } from "@/features/stacks";
import { m } from "@/paraglide/messages";
import { ensureQueryDataOr404 } from "@/shared/routing/loader-utils";

export const Route = createFileRoute(
	"/(private)/_sidebar/infra/components/$component_id"
)({
	loader: async ({ context: { queryClient }, params: { component_id } }) => {
		const component = await ensureQueryDataOr404(
			queryClient.ensureQueryData(componentQueries.detail(component_id))
		);
		await queryClient.ensureQueryData(stackQueries.list({ component_id }));
		return { component, crumb: component.name };
	},
	head({ loaderData }) {
		if (!loaderData?.component)
			return { meta: [{ title: m.components_not_found_title() }] };
		return {
			meta: [
				{
					title: m.components_route_title({ name: loaderData.component.name }),
				},
			],
		};
	},
	notFoundComponent: ComponentNotFound,
	pendingComponent: ComponentDetailSkeleton,
	component: RouteComponent,
});

function RouteComponent() {
	const { component_id } = Route.useParams();
	const { data: component } = useSuspenseQuery(
		componentQueries.detail(component_id)
	);
	const { data: stacks } = useSuspenseQuery(
		stackQueries.list({ component_id })
	);

	return (
		<ComponentDetailLayout component={component} stackCount={stacks.total}>
			<Outlet />
		</ComponentDetailLayout>
	);
}
