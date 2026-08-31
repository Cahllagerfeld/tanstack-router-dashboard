import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { m } from "@/paraglide/messages";
import {
	Link,
	Outlet,
	createFileRoute,
	useMatchRoute,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/settings")({
	loader: () => ({ crumb: m.settings_navigation_label() }),
	component: SettingsLayout,
});

function SettingsLayout() {
	const matchRoute = useMatchRoute();
	const activeTab = matchRoute({ to: "/settings/members" })
		? "members"
		: "general";

	return (
		<div className="space-y-6">
			<Tabs value={activeTab} className="w-full">
				<TabsList aria-label={m.settings_tabs_label()}>
					<TabsTrigger
						nativeButton={false}
						value="general"
						render={
							<Link to="/settings/general">{m.settings_tab_general()}</Link>
						}
					/>
					<TabsTrigger
						nativeButton={false}
						value="members"
						render={
							<Link to="/settings/members">{m.settings_tab_members()}</Link>
						}
					/>
				</TabsList>
				<div>
					<Outlet />
				</div>
			</Tabs>
		</div>
	);
}
