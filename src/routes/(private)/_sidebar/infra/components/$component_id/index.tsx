import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { componentQueries } from "@/features/components";
import { ComponentConfigurationTab } from "@/features/components/ui";

export const Route = createFileRoute(
	"/(private)/_sidebar/infra/components/$component_id/"
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { component_id } = Route.useParams();
	const { data: component } = useSuspenseQuery(
		componentQueries.detail(component_id)
	);

	return <ComponentConfigurationTab configuration={component.configuration} />;
}
