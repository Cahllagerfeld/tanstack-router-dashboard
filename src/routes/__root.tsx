import { Toaster } from "@/components/ui/sonner";
import { serverQueries } from "@/data/server";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	loader: async ({ context: { queryClient } }) => {
		return queryClient.ensureQueryData(serverQueries.serverInfo());
	},
	component: RootLayout,
});

function RootLayout() {
	return (
		<div className="font-medium antialiased">
			<Outlet />
			<Toaster position="top-center" />
			<TanStackRouterDevtools />
		</div>
	);
}
