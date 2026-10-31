import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ensureCurrentIdentity } from "@/features/session";

export const Route = createFileRoute("/(private)")({
	component: PrivateLayout,
	beforeLoad: async ({ context }) => {
		await ensureCurrentIdentity(context.queryClient);
	},
});

function PrivateLayout() {
	return <Outlet />;
}
