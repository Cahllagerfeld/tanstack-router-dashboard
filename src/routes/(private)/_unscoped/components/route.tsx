import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_unscoped/components")({
	loader: () => {
		return {
			crumb: "Components",
		};
	},
	component: Outlet,
});
