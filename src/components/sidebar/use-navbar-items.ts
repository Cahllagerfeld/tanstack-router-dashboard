import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { NavbarItem } from "@/types/navbar";
import {
	Activity,
	Box,
	Boxes,
	Frame,
	GitBranch,
	PlayCircle,
	Settings,
} from "lucide-react";

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
		url: "/stacks",
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

const projectPreviewNavMain: NavbarItem[] = [
	{
		title: "Project Overview",
		url: "#",
		icon: Frame,
	},
	{
		title: "Pipelines",
		url: "#",
		icon: GitBranch,
	},
	{
		title: "Runs",
		url: "#",
		icon: PlayCircle,
	},
	{
		title: "Artifacts",
		url: "#",
		icon: Activity,
	},
];

export function useNavbarItems() {
	const navItems = useSidebarItems(unscopedNavMain);
	const projectPreviewItems = useSidebarItems(projectPreviewNavMain);

	return { navItems, projectPreviewItems };
}
