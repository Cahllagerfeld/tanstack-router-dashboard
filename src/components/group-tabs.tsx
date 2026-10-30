import { Link, type LinkProps, useMatchRoute } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type GroupTab = {
	label: string;
	to: NonNullable<LinkProps["to"]>;
};

/** The pages of a rail group. Detail pages below a tab bring their own header, so the row hides there. */
export function GroupTabs({
	label,
	tabs,
}: {
	label: string;
	tabs: GroupTab[];
}) {
	const matchRoute = useMatchRoute();
	const activeTab = tabs.find((tab) => matchRoute({ to: tab.to }));

	if (!activeTab) return null;

	return (
		<Tabs value={activeTab.to} className="-mx-4 -mt-4 border-b px-4">
			<TabsList variant="line" aria-label={label}>
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.to}
						nativeButton={false}
						value={tab.to}
						className="flex-none"
						render={<Link to={tab.to}>{tab.label}</Link>}
					/>
				))}
			</TabsList>
		</Tabs>
	);
}
