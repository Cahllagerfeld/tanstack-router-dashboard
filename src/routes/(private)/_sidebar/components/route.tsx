import { Outlet, createFileRoute } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/components")({
	loader: () => {
		return {
			crumb: m.components_navigation_label(),
		};
	},
	component: Outlet,
});
