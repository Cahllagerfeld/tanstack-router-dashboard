import { createFileRoute, redirect } from "@tanstack/react-router";
import { serverQueries } from "@/data/server";

export const Route = createFileRoute(
	"/(public)/_grid-layout/server-activation"
)({
	loader: async ({ context: { queryClient } }) => {
		const serverInfo = await queryClient.ensureQueryData(
			serverQueries.serverInfo()
		);

		if (serverInfo.active) throw redirect({ to: "/" });
	},
});
