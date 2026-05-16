import { Toaster } from "@/components/ui/sonner";
import { serverQueries } from "@/data/server";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	redirect,
	useMatchRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async ({ context: { queryClient }, location, buildLocation }) => {
		const serverInfo = await queryClient.ensureQueryData(
			serverQueries.serverInfo()
		);
		if (
			serverInfo.active === false &&
			location.pathname !== buildLocation({ to: "/server-activation" }).pathname
		)
			throw redirect({ to: "/server-activation" });
	},
	loader: async ({ context: { queryClient } }) => {
		return queryClient.ensureQueryData(serverQueries.serverInfo());
	},
	component: RootLayout,
	head: () => {
		return {
			meta: [{ title: "Dashboard" }],
		};
	},
});

function RootLayout() {
	return (
		<ThemeScope>
			<HeadContent />
			<Outlet />
			<Toaster position="top-center" />
			{/* <TanStackRouterDevtools /> */}
			<ReactQueryDevtools />
		</ThemeScope>
	);
}

function ThemeScope({ children }: { children: ReactNode }) {
	const matchRoute = useMatchRoute();
	const isProjectScoped = !!matchRoute({
		to: "/projects/$project_id",
		fuzzy: true,
	});

	return (
		<div
			data-theme-scope={isProjectScoped ? "project" : "app"}
			className="flex h-dvh flex-col font-medium antialiased"
		>
			{children}
		</div>
	);
}
