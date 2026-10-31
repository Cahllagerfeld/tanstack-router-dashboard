import { Outlet, createFileRoute } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";
import { GroupTabs } from "@/shared/components/group-tabs";

export const Route = createFileRoute("/(private)/_sidebar/settings")({
	loader: () => ({ crumb: m.settings_navigation_label() }),
	component: SettingsLayout,
});

function SettingsLayout() {
	return (
		<>
			<GroupTabs
				label={m.settings_tabs_label()}
				tabs={[
					{ label: m.settings_tab_general(), to: "/settings/general" },
					{ label: m.settings_tab_members(), to: "/settings/members" },
				]}
			/>
			<Outlet />
		</>
	);
}
