import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { componentQueries } from "@/features/components";
import { ComponentDetailLayout } from "@/features/components/ui";
import { stackQueries } from "@/features/stacks";

export const Route = createFileRoute(
	"/(private)/_sidebar/infra/components/$component_id/_detail"
)({
	loader: ({ context: { queryClient }, params: { component_id } }) =>
		queryClient.ensureQueryData(stackQueries.list({ component_id })),
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
