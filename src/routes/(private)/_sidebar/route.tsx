import { Outlet, createFileRoute } from "@tanstack/react-router";

import { BreadcrumbsContainer } from "@/components/breadcrumb/Breadcrumb";
import { AppRail } from "@/components/sidebar/app-rail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { projectQueries } from "@/data/projects";

export const Route = createFileRoute("/(private)/_sidebar")({
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(projectQueries.list());
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-dvh min-h-0 w-full overflow-hidden bg-window-background">
			<AppRail />
			<main
				data-slot="app-inset"
				className="m-1 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border bg-background shadow-sm"
			>
				<ScrollArea className="min-h-0 flex-1">
					<header className="flex h-16 shrink-0 items-center gap-2 px-4">
						<BreadcrumbsContainer />
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
						<Outlet />
					</div>
				</ScrollArea>
			</main>
		</div>
	);
}
