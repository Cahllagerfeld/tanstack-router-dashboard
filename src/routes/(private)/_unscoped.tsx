import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guards";

export const Route = createFileRoute("/(private)/_unscoped")({
	beforeLoad: async ({ context: { queryClient } }) => {
		await requireAuth(queryClient);
	},
});
