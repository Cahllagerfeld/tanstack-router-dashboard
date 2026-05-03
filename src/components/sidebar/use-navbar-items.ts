import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { NavbarItem } from "@/types/navbar";
import { useParams, useRouter } from "@tanstack/react-router";
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

	return useSidebarItems(projectPreviewNavMain);
}
