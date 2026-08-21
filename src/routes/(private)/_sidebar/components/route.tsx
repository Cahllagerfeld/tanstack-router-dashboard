import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/components")({
	loader: () => {
		return {
			crumb: "Components",
		};
	},
	component: Outlet,
});
