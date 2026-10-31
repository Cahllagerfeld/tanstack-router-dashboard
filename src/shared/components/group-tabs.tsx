import { Link, type LinkProps, useMatchRoute } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export type GroupTab = {
	label: string;
	to: NonNullable<LinkProps["to"]>;
	params?: LinkProps["params"];
	count?: number;
};

/** The pages of a rail group or Detail Screen. Pages below every tab bring their own header, so the row hides there. */
export function GroupTabs({
	label,
	tabs,
}: {
	label: string;
	tabs: GroupTab[];
}) {
	const matchRoute = useMatchRoute();
	const activeTab = tabs.find((tab) =>
		matchRoute({ to: tab.to, params: tab.params })
	);

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
						render={
							<Link to={tab.to} params={tab.params}>
								{tab.label}
								{tab.count !== undefined && (
									<span className="text-xs font-normal text-muted-foreground tabular-nums">
										{tab.count}
									</span>
								)}
							</Link>
						}
					/>
				))}
			</TabsList>
		</Tabs>
	);
}
