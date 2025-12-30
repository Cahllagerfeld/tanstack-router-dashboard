import { componentQueries } from "@/data/components";
import {
	createFileRoute,
	Link,
	Outlet,
	useMatchRoute,
} from "@tanstack/react-router";
import { ComponentDetailSkeleton } from "@/features/components/detail/component-detail-skeleton";
import { ensureQueryDataOr404 } from "@/lib/loader-utils";
import { ComponentNotFound } from "@/features/components/detail/component-not-found";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentHeader } from "@/features/components/detail/component-header";
import { useSuspenseQuery } from "@tanstack/react-query";

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
				<TabsList>
					<TabsTrigger
						value="general"
						render={
							<Link to="/components/$component_id" params={{ component_id }}>
								General
							</Link>
						}
					></TabsTrigger>
					<TabsTrigger
						value="stacks"
						render={
							<Link
								to="/components/$component_id/stacks"
								params={{ component_id }}
							>
								Stacks
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
