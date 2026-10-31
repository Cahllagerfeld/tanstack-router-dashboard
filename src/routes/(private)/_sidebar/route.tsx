import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AppRail } from "@/app/navigation/app-rail";
import { BreadcrumbsContainer } from "@/app/navigation/breadcrumbs";
import { projectQueries } from "@/features/projects";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const Route = createFileRoute("/(private)/_sidebar")({
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(projectQueries.allList());
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
				<header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
					<BreadcrumbsContainer />
				</header>
				<ScrollArea className="min-h-0 flex-1">
					<div className="flex flex-1 flex-col">
						<Outlet />
					</div>
				</ScrollArea>
			</main>
		</div>
	);
}
