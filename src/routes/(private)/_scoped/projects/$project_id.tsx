import { serverQueries } from "@/data/server";
import { projectQueries } from "@/data/projects";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guards";
import { ensureQueryDataOr404 } from "@/lib/loader-utils";
import { ProjectScopedSidebar } from "@/components/sidebar/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/(private)/_scoped/projects/$project_id")(
	{
		beforeLoad: async ({ context: { queryClient } }) => {
			await requireAuth(queryClient);
		},
		loader: async ({ context: { queryClient }, params: { project_id } }) => {
			const [, , project] = await Promise.all([
				queryClient.ensureQueryData(serverQueries.serverInfo()),
				queryClient.ensureQueryData(projectQueries.list()),
				ensureQueryDataOr404(
					queryClient.ensureQueryData(projectQueries.detail(project_id))
				),
			]);
			return { project };
		},
		head({ loaderData }) {
			if (!loaderData?.project)
				return { meta: [{ title: "Project Not Found" }] };
			return {
				meta: [{ title: `Project ${loaderData.project.name}` }],
			};
		},
		component: RouteComponent,
	}
);

function RouteComponent() {
	return (
		<SidebarProvider>
			<ProjectScopedSidebar />
			<SidebarInset className="overflow-x-hidden">
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
