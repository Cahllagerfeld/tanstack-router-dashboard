import { createFileRoute, redirect } from "@tanstack/react-router";
import { serverQueries } from "@/data/server";

export const Route = createFileRoute("/")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient } }) => {
		const serverInfo = await queryClient.ensureQueryData(
			serverQueries.serverInfo()
		);
		if (serverInfo.active === false)
			throw redirect({ to: "/server-activation" });
	},
});
