import { stackQueries } from "@/data/stacks";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_unscoped/stacks/")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) throw redirect({ to: "/login" });
	},
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(stackQueries.stackList());
	},
});
