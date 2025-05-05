import { serverQueries } from "@/data/server";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_unscoped/settings/general")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(serverQueries.serverSettings());
	},
});
