import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/context/auth";
import { serverQueries } from "@/data/server";
import { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	auth: AuthContext;
}>()({
	beforeLoad: async ({ context: { queryClient }, location }) => {
		const serverInfo = await queryClient.ensureQueryData(
			serverQueries.serverInfo()
		);
		if (
			serverInfo.active === false &&
			location.pathname !== "/server-activation"
		)
			throw redirect({ to: "/server-activation" });
	},
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
