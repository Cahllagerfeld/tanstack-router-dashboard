import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_unscoped/stacks")({
	component: Outlet,
	loader: () => {
		return {
			crumb: "Stacks",
		};
	},
});
