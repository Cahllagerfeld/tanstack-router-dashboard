import { m } from "@/paraglide/messages";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/components")({
	loader: () => {
		return {
			crumb: m.components_navigation_label(),
		};
	},
	component: Outlet,
});
