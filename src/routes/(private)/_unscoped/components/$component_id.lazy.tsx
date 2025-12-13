import { componentQueries } from "@/data/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentHeader } from "@/features/components/detail/component-header";
import { ComponentGeneralTab } from "@/features/components/detail/general-tab";
import { ComponentStacksTab } from "@/features/components/detail/stacks-tab";

export const Route = createLazyFileRoute(
	"/(private)/_unscoped/components/$component_id"
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { component_id } = Route.useParams();
	const { tab } = Route.useSearch();

	const { data: component } = useSuspenseQuery(
		componentQueries.detail(component_id)
	);

	return (
		<div className="space-y-6">
			<ComponentHeader component={component} />

			<Tabs value={tab} className="w-full">
				<TabsList>
					<TabsTrigger value="general" asChild>
						<Link
							to="/components/$component_id"
							params={{ component_id }}
							search={{ tab: "general" }}
						>
							General
						</Link>
					</TabsTrigger>
					<TabsTrigger value="stacks" asChild>
						<Link
							to="/components/$component_id"
							params={{ component_id }}
							search={{ tab: "stacks" }}
						>
							Stacks
						</Link>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="mt-6">
					<ComponentGeneralTab component={component} />
				</TabsContent>

				<TabsContent value="stacks" className="mt-6">
					<ComponentStacksTab componentId={component.id} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
