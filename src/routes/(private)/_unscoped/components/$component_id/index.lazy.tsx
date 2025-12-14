import { componentQueries } from "@/data/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ComponentGeneralTab } from "@/features/components/detail/general-tab";

export const Route = createLazyFileRoute(
	"/(private)/_unscoped/components/$component_id/"
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { component_id } = Route.useParams();
	const { data: component } = useSuspenseQuery(
		componentQueries.detail(component_id)
	);

	return <ComponentGeneralTab component={component} />;
}
