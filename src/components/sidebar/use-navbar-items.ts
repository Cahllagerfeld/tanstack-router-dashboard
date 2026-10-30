import { useLocation, useRouter } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { useActiveProject } from "@/hooks/use-active-project";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import { m } from "@/paraglide/messages";
import type { NavbarItem } from "@/types/navbar";

function getInfraItem(): NavbarItem {
	return {
		title: m.infra_navigation_label(),
		url: "/infra/stacks",
		icon: getEntityIcon("stack"),
		activePathPrefix: "/infra",
	};
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
			title: m.common_navigation_models(),
			url: "#models",
			icon: getEntityIcon("model"),
			disabled: true,
		},
		{
			title: m.common_navigation_artifacts(),
			url: "#artifacts",
			icon: getEntityIcon("artifact"),
			disabled: true,
		},
		{
			title: m.common_navigation_deployments(),
			url: "#deployments",
			icon: getEntityIcon("deployment"),
			disabled: true,
		},
	];
}

function withActiveState(items: NavbarItem[], pathname: string) {
	return items.map((item) => ({
		...item,
		isActive: item.activePathPrefix
			? pathname.startsWith(item.activePathPrefix)
			: item.url === pathname,
	}));
}

export function useNavbarItems() {
	const { pathname } = useLocation();
	const projectItems = useProjectItems();

	return {
		navItems: withActiveState([...projectItems, getInfraItem()], pathname),
		footerItems: withActiveState(getFooterItems(), pathname),
	};
}
