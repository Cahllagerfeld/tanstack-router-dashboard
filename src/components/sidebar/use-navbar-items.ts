import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import { NavbarItem } from "@/types/navbar";
import { Settings } from "lucide-react";

const unscopedNavMain: NavbarItem[] = [
	{
		title: "Projects",
		url: "/projects",
		icon: getEntityIcon("project"),
	},
	{
		title: "Components",
		url: "/components",
		icon: getEntityIcon("component"),
	},
	{
		title: "Stacks",
		url: "/stacks",
		icon: getEntityIcon("stack"),
	},
	{
		title: "Settings",
		url: "/settings/general",
		icon: Settings,
		activePathPrefix: "/settings",
	},
];

const projectPreviewNavMain: NavbarItem[] = [
	{
		title: "Project Overview",
		url: "#",
		icon: getEntityIcon("project"),
	},
	{
		title: "Pipelines",
		url: "#",
		icon: getEntityIcon("pipeline"),
	},
	{
		title: "Runs",
		url: "#",
		icon: getEntityIcon("run"),
	},
	{
		title: "Artifacts",
		url: "#",
		icon: getEntityIcon("artifact"),
	},
];

export function useNavbarItems() {
	const navItems = useSidebarItems(unscopedNavMain);
	const projectPreviewItems = useSidebarItems(projectPreviewNavMain);

	return { navItems, projectPreviewItems };
}
