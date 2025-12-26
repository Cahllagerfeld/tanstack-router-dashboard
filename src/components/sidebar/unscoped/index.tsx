import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { projectQueries } from "@/data/projects";
import { serverQueries } from "@/data/server";
import { getAvatarUrl } from "@/lib/avatar";
import { getProjectDisplayName } from "@/lib/names";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Frame } from "lucide-react";
import { Suspense } from "react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { NavProjects } from "../nav-projects";
import { useUnscopedSidebar } from "./service";

export function UnscopedSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { navItems } = useUnscopedSidebar();

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<UnscopedSidebarHeader />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems} label="Server" />
				<Suspense fallback={<div>Loading...</div>}>
					<ProjectsSidebar />
				</Suspense>
				{/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}

function ProjectsSidebar() {
	const { data: projectData } = useSuspenseQuery(
		projectQueries.list({ size: 3 })
	);

	const projects = projectData.items.map((project) => ({
		id: project.id,
		name: getProjectDisplayName(project),
		url: `/projects/${project.name}`,
		icon: Frame,
	}));

	return <NavProjects projects={projects} />;
}

function UnscopedSidebarHeader() {
	const { data: serverData } = useSuspenseQuery(serverQueries.serverInfo());
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					render={
						<Link to="/projects">
							<Avatar className="size-8 shrink-0">
								<AvatarImage
									className="rounded-md object-cover"
									src={getAvatarUrl(serverData.name || "")}
								/>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{serverData.name}
								</span>
							</div>
						</Link>
					}
				></SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
