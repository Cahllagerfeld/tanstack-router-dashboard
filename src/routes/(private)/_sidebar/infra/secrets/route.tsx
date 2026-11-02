import { Outlet, createFileRoute } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/(private)/_sidebar/infra/secrets")({
	loader: () => {
		return {
			crumb: m.secrets_navigation_label(),
		};
	},
	component: Outlet,
});
