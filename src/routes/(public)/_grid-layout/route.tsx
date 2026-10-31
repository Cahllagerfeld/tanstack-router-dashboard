import { Outlet, createFileRoute } from "@tanstack/react-router";

import { RippleBackground } from "@/shared/components/ripple-background/ripple-background";

export const Route = createFileRoute("/(public)/_grid-layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative flex min-h-svh w-full items-center justify-center px-4 lg:px-0">
			<RippleBackground />
			<main className="z-10">
				<Outlet />
			</main>
		</div>
	);
}
