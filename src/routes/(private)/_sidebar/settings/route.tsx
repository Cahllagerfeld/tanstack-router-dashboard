import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/settings")({
	loader: () => ({ crumb: "Settings" }),
	component: SettingsLayout,
});

function SettingsLayout() {
	const pathname = useLocation({ select: (loc) => loc.pathname });
	const activeTab = pathname.startsWith("/settings/members")
		? "members"
		: pathname.startsWith("/settings/secrets")
			? "secrets"
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
					<TabsTrigger
						nativeButton={false}
						value="secrets"
						render={<Link to="/settings/secrets">Secrets</Link>}
					/>
				</TabsList>
				<div>
					<Outlet />
				</div>
			</Tabs>
		</div>
	);
}
