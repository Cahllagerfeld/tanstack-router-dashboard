import { BreadcrumbsContainer } from "@/components/breadcrumb/Breadcrumb";
import { UnscopedSidebar } from "@/components/sidebar/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_sidebar")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<UnscopedSidebar />
			<SidebarInset className="overflow-x-hidden">
				<ScrollArea className="h-full">
					<header className="flex h-16 shrink-0 items-center gap-2">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2" />
							<BreadcrumbsContainer />
						</div>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
						<Outlet />
					</div>
				</ScrollArea>
			</SidebarInset>
		</SidebarProvider>
	);
}
