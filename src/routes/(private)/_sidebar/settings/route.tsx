import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	createFileRoute,
	Link,
	Outlet,
	useMatchRoute,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/settings")({
	loader: () => ({ crumb: "Settings" }),
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
				<TabsList aria-label="Settings sections">
					<TabsTrigger
						nativeButton={false}
						value="general"
						render={<Link to="/settings/general">General</Link>}
					/>
					<TabsTrigger
						nativeButton={false}
						value="members"
						render={<Link to="/settings/members">Members</Link>}
					/>
				</TabsList>
				<div>
					<Outlet />
				</div>
			</Tabs>
		</div>
	);
}
