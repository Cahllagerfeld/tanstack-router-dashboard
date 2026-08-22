import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar/projects")({
	loader: () => ({
		crumb: "Projects",
	}),
	component: Outlet,
});
