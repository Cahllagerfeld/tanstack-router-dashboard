import { serviceAccountQueries } from "@/data/service-accounts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(private)/_unscoped/settings/service-accounts/"
)({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(serviceAccountQueries.list());
	},
});
