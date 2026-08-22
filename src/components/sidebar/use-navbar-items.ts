import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import type { NavbarItem } from "@/types/navbar";
import { useParams, useRouter } from "@tanstack/react-router";
import { Frame, Settings } from "lucide-react";

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

export function useNavbarItems() {
	const navItems = useSidebarItems(unscopedNavMain);
	return { navItems };
}

export function useProjectItems() {
	const { buildLocation } = useRouter();
	const projectId = useParams({
		from: "/(private)/_sidebar/projects/$project_id",
	});
	const projectPreviewNavMain: NavbarItem[] = [
		{
			title: "Project Overview",
			url: buildLocation({
				to: "/projects/$project_id",
				params: { project_id: projectId.project_id },
			}).pathname,
			icon: Frame,
		},
		{
			title: "Pipelines",
			url: buildLocation({
				to: "/projects/$project_id/pipelines",
				params: { project_id: projectId.project_id },
			}).pathname,
			icon: getEntityIcon("pipeline"),
		},
		{
			title: "Runs",
			url: "#",
			icon: getEntityIcon("run"),
			disabled: true,
		},
		{
			title: "Artifacts",
			url: "#",
			icon: getEntityIcon("artifact"),
			disabled: true,
		},
	];

	return useSidebarItems(projectPreviewNavMain);
}
