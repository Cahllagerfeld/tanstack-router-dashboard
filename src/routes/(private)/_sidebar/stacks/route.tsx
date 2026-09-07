import { Outlet, createFileRoute } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/stacks")({
	component: Outlet,
	loader: () => {
		return {
			crumb: m.stacks_navigation_label(),
		};
	},
});
