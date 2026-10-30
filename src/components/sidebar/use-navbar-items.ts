import { useRouter } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { useActiveProject } from "@/hooks/use-active-project";
import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import { m } from "@/paraglide/messages";
import type { NavbarItem } from "@/types/navbar";

function getServerItems(): NavbarItem[] {
	return [
		{
			title: m.components_navigation_label(),
			url: "/components",
			icon: getEntityIcon("component"),
			activePathPrefix: "/components",
		},
		{
			title: m.stacks_navigation_label(),
			url: "/stacks",
			icon: getEntityIcon("stack"),
			activePathPrefix: "/stacks",
		},
	];
}

function getFooterItems(): NavbarItem[] {
	return [
		{
			title: m.settings_navigation_label(),
			url: "/settings/general",
			icon: Settings,
			activePathPrefix: "/settings",
		},
	];
}

function useProjectItems(): NavbarItem[] {
	const { buildLocation } = useRouter();
	const { activeProject } = useActiveProject();

	if (!activeProject) return [];

	const params = { project_id: activeProject.name };
	const pipelinesUrl = buildLocation({
		to: "/projects/$project_id/pipelines",
		params,
	}).pathname;
	const runsUrl = buildLocation({
		to: "/projects/$project_id/runs",
		params,
	}).pathname;

	return [
		{
			title: m.common_navigation_pipelines(),
			url: pipelinesUrl,
			icon: getEntityIcon("pipeline"),
			activePathPrefix: pipelinesUrl,
		},
		{
			title: m.common_navigation_runs(),
			url: runsUrl,
			icon: getEntityIcon("run"),
			activePathPrefix: runsUrl,
		},
		{
			title: m.common_navigation_artifacts(),
			url: "#",
			icon: getEntityIcon("artifact"),
			disabled: true,
		},
	];
}

export function useNavbarItems() {
	const projectItems = useProjectItems();
	const navItems = useSidebarItems([...projectItems, ...getServerItems()]);
	const footerItems = useSidebarItems(getFooterItems());
	return { navItems, footerItems };
}
