import { Outlet, createFileRoute } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/projects")({
	loader: () => ({
		crumb: m.projects_navigation_label(),
	}),
	component: Outlet,
});
