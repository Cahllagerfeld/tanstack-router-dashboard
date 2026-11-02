import { type LinkProps, useMatch, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import type { Project } from "@/features/projects";
import { useActiveProject } from "@/features/projects/ui";
import { m } from "@/paraglide/messages";

import {
	filterSettingsSections,
	type SettingsNavSection,
} from "./settings-nav";

export type SettingsNavItem = {
	label: string;
	to: NonNullable<LinkProps["to"]>;
	params?: LinkProps["params"];
};

type Section = SettingsNavSection<SettingsNavItem> & {
	id: "server" | "project";
};

/** The settings navigation: Server pages, then pages of the selected Project. */
export function useSettingsNav() {
	const [filter, setFilter] = useState("");
	const { projects, activeProject } = useActiveProject();
	const navigate = useNavigate();
	const projectSettingsMatch = useMatch({
		from: "/(private)/_sidebar/settings/projects/$project_id",
		shouldThrow: false,
	});

	const sections: Section[] = [
		{
			id: "server",
			label: m.settings_nav_server(),
			items: [
				{ label: m.settings_nav_server_general(), to: "/settings/general" },
				{ label: m.settings_nav_server_members(), to: "/settings/members" },
			],
		},
		{
			id: "project",
			label: m.settings_nav_project(),
			items: activeProject
				? [
						{
							label: m.settings_nav_project_general(),
							to: "/settings/projects/$project_id/general",
							// Keep the URL's identifier, which may be a name or an ID.
							params: {
								project_id:
									projectSettingsMatch?.params.project_id ?? activeProject.name,
							},
						},
					]
				: [],
		},
	];

	/** Opens the same page for another Project, or its first page from a Server page. */
	function selectProject(project: Project) {
		if (projectSettingsMatch) {
			navigate({
				to: ".",
				params: (previous: Record<string, string>) => ({
					...previous,
					project_id: project.name,
				}),
			});
			return;
		}
		navigate({
			to: "/settings/projects/$project_id/general",
			params: { project_id: project.name },
		});
	}

	return {
		filter,
		setFilter,
		sections: filterSettingsSections(sections, filter),
		projects,
		activeProject,
		selectProject,
	};
}
