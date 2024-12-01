import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/context/auth";
import { serverQueries } from "@/data/server";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	auth: AuthContext;
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
			{/* <TanStackRouterDevtools /> */}
			<ReactQueryDevtools />
		</div>
	);
}
