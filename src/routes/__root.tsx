import { serverQueries } from "@/data/server";
import { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from "@tanstack/react-router";
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
		<>
			<div className="flex gap-2 p-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
