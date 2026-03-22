import { userQueries } from "@/data/user";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
	component: PrivateLayout,
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(userQueries.currentUser());
	},
});

function PrivateLayout() {
	return <Outlet />;
}
