import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/")({
	loader: () => {
		throw redirect({ to: "/projects" });
	},
});
