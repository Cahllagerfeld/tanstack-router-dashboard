import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/stacks")({
	component: Outlet,
	loader: () => {
		return {
			crumb: "Stacks",
		};
	},
});
