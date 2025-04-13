import { projectQueries } from "@/data/projects";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_unscoped/projects")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(projectQueries.projectList());
	},
});
