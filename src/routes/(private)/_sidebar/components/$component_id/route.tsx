import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { componentQueries } from "@/data/components";
import { ComponentDetailSkeleton } from "@/features/components/detail/component-detail-skeleton";
import { ComponentHeader } from "@/features/components/detail/component-header";
import { ComponentNotFound } from "@/features/components/detail/component-not-found";
import { ensureQueryDataOr404 } from "@/lib/loader-utils";
import { m } from "@/paraglide/messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	Link,
	Outlet,
	createFileRoute,
	useMatchRoute,
} from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(private)/_sidebar/components/$component_id"
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

	const activeTab = matchRoute({ to: "/components/$component_id/stacks" })
		? "stacks"
		: "general";

	const { data: component } = useSuspenseQuery(
		componentQueries.detail(component_id)
	);

	return (
		<div className="space-y-6">
			<ComponentHeader component={component} />

			<Tabs value={activeTab} className="w-full">
				<TabsList variant="line">
					<TabsTrigger
						nativeButton={false}
						value="general"
						render={
							<Link to="/components/$component_id" params={{ component_id }}>
								{m.components_detail_tab_general()}
							</Link>
						}
					></TabsTrigger>
					<TabsTrigger
						nativeButton={false}
						value="stacks"
						render={
							<Link
								to="/components/$component_id/stacks"
								params={{ component_id }}
							>
								{m.components_detail_tab_stacks()}
							</Link>
						}
					></TabsTrigger>
				</TabsList>

				<div className="mt-6">
					<Outlet />
				</div>
			</Tabs>
		</div>
	);
}
