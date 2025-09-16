import { stackQueries } from "@/data/stacks";
import { requireAuth } from "@/lib/auth-guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_unscoped/stacks/")({
	beforeLoad: async ({ context: { queryClient } }) => {
		await requireAuth(queryClient);
	},
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(stackQueries.stackList());
	},
});
