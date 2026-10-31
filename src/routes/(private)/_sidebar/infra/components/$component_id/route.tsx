import { useSuspenseQuery } from "@tanstack/react-query";
import {
	Link,
	Outlet,
	createFileRoute,
	useMatchRoute,
} from "@tanstack/react-router";

import { componentQueries } from "@/data/components";
import {
	ComponentDetailSkeleton,
	ComponentHeader,
	ComponentNotFound,
} from "@/features/components/ui";
import { m } from "@/paraglide/messages";
import { ContentInset } from "@/shared/components/content-inset";
import { ensureQueryDataOr404 } from "@/shared/routing/loader-utils";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export const Route = createFileRoute(
	"/(private)/_sidebar/infra/components/$component_id"
)({
	loader: async ({ context: { queryClient }, params: { component_id } }) => {
		const component = await ensureQueryDataOr404(
			queryClient.ensureQueryData(componentQueries.detail(component_id))
		);
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
	const matchRoute = useMatchRoute();

	const activeTab = matchRoute({ to: "/infra/components/$component_id/stacks" })
		? "stacks"
		: "general";

	const { data: component } = useSuspenseQuery(
		componentQueries.detail(component_id)
	);

	return (
		<Tabs value={activeTab} className="gap-0">
			<ContentInset className="space-y-6">
				<ComponentHeader component={component} />
				<TabsList variant="line">
					<TabsTrigger
						nativeButton={false}
						value="general"
						render={
							<Link
								to="/infra/components/$component_id"
								params={{ component_id }}
							>
								{m.components_detail_tab_general()}
							</Link>
						}
					></TabsTrigger>
					<TabsTrigger
						nativeButton={false}
						value="stacks"
						render={
							<Link
								to="/infra/components/$component_id/stacks"
								params={{ component_id }}
							>
								{m.components_detail_tab_stacks()}
							</Link>
						}
					></TabsTrigger>
				</TabsList>
			</ContentInset>
			<Outlet />
		</Tabs>
	);
}
