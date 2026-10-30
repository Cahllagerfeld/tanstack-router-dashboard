import { Outlet, createFileRoute } from "@tanstack/react-router";

import { GroupTabs } from "@/components/group-tabs";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/infra")({
	loader: () => ({ crumb: m.infra_navigation_label() }),
	component: InfraLayout,
});

function InfraLayout() {
	return (
		<>
			<GroupTabs
				label={m.infra_tabs_label()}
				tabs={[
					{ label: m.stacks_navigation_label(), to: "/infra/stacks" },
					{ label: m.components_navigation_label(), to: "/infra/components" },
				]}
			/>
			<Outlet />
		</>
	);
}
