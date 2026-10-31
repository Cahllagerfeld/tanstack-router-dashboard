import { Outlet } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";
import { GroupTabs } from "@/shared/components/group-tabs";

export function InfraLayout() {
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
