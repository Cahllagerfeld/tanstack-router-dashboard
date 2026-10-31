import { Link, type LinkProps, useMatchRoute } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

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
		<Tabs value={activeTab.to} className="h-11 shrink-0 border-b px-4">
			<TabsList
				variant="line"
				aria-label={label}
				className="items-end gap-5 p-0 group-data-horizontal/tabs:h-full"
			>
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.to}
						nativeButton={false}
						value={tab.to}
						className="flex-none px-0 font-normal group-data-horizontal/tabs:after:-bottom-px data-active:font-semibold"
						render={<Link to={tab.to}>{tab.label}</Link>}
					/>
				))}
			</TabsList>
		</Tabs>
	);
}
