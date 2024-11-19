import { createFileRoute, redirect } from "@tanstack/react-router";
import { serverQueries } from "@/data/server";

export const Route = createFileRoute("/")({
	loader: async ({ context: { queryClient } }) => {
		const serverInfo = await queryClient.ensureQueryData(
			serverQueries.serverInfo()
		);
		if (serverInfo.active === false)
			throw redirect({ to: "/server-activation" });
	},
});
