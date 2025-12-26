import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { componentQueries } from "@/data/components";
import { ComponentHeader } from "@/features/components/detail/component-header";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	createLazyFileRoute,
	Link,
	Outlet,
	useMatchRoute,
} from "@tanstack/react-router";

export const Route = createLazyFileRoute(
	"/(private)/_unscoped/components/$component_id"
)({
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
