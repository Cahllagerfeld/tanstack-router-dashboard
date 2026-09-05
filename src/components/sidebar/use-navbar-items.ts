import { useParams, useRouter } from "@tanstack/react-router";
import { Frame, Settings } from "lucide-react";

import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import { m } from "@/paraglide/messages";
import type { NavbarItem } from "@/types/navbar";

function getUnscopedNavMain(): NavbarItem[] {
	return [
		{
			title: m.projects_navigation_label(),
			url: "/projects",
			icon: getEntityIcon("project"),
		},
		{
			title: m.components_navigation_label(),
			url: "/components",
			icon: getEntityIcon("component"),
		},
		{
			title: m.stacks_navigation_label(),
			url: "/stacks",
			icon: getEntityIcon("stack"),
		},
		{
			title: m.settings_navigation_label(),
			url: "/settings/general",
			icon: Settings,
			activePathPrefix: "/settings",
		},
	];
}

export function useNavbarItems() {
	const navItems = useSidebarItems(getUnscopedNavMain());
	return { navItems };
}

export function useProjectItems() {
	const { buildLocation } = useRouter();
	const projectId = useParams({
		from: "/(private)/_sidebar/projects/$project_id",
	});
	const projectPreviewNavMain: NavbarItem[] = [
		{
			title: m.common_navigation_project_overview(),
			url: buildLocation({
				to: "/projects/$project_id",
				params: { project_id: projectId.project_id },
			}).pathname,
			icon: Frame,
		},
		{
			title: m.common_navigation_pipelines(),
			url: buildLocation({
				to: "/projects/$project_id/pipelines",
				params: { project_id: projectId.project_id },
			}).pathname,
			icon: getEntityIcon("pipeline"),
		},
		{
			title: m.common_navigation_runs(),
			url: buildLocation({
				to: "/projects/$project_id/runs",
				params: { project_id: projectId.project_id },
			}).pathname,
			icon: getEntityIcon("run"),
		},
		{
			title: m.common_navigation_artifacts(),
			url: "#",
			icon: getEntityIcon("artifact"),
			disabled: true,
		},
	];

	return useSidebarItems(projectPreviewNavMain);
}
