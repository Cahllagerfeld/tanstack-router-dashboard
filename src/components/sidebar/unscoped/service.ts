import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { NavbarItem } from "@/types/navbar";
import { Box, Boxes, Frame, Settings } from "lucide-react";

const unscopedNavMain: NavbarItem[] = [
	{
		title: "Projects",
		url: "/projects",
		icon: Frame,
	},
	{
		title: "Components",
		url: "/components",
		icon: Box,
	},
	{
		title: "Stacks",
		url: "#",
		icon: Boxes,
	},
	{
		title: "Settings",
		url: "/settings/general",
		icon: Settings,
		items: [
			{
				title: "General",
				url: "/settings/general",
			},
			{
				title: "Members",
				url: "/settings/members",
			},
			{
				title: "API Tokens",
				url: "#",
			},
			{
				title: "Secrets",
				url: "#",
			},
			{
				title: "Connectors",
				url: "#",
			},
			{
				title: "Service Accounts",
				url: "#",
			},
		],
	},
];

export function useUnscopedSidebar() {
	const navItems = useSidebarItems(unscopedNavMain);

	return { navItems };
}
