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
import { Box, Boxes, Frame, Settings } from "lucide-react";
import { Suspense } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { NavProjects } from "./nav-projects";

const unscopedNavMain = [
	{
		title: "Projects",
		url: "/projects",
		icon: Frame,
	},
	{
		title: "Components",
		url: "/components",
		icon: Box,
	},
	{
		title: "Stacks",
		url: "#",
		icon: Boxes,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
		isActive: true,
		items: [
			{
				title: "General",
				url: "/settings/general",
			},
			{
				title: "Members",
				url: "#",
			},
			{
				title: "API Tokens",
				url: "#",
			},
			{
				title: "Secrets",
				url: "#",
			},
			{
				title: "Connectors",
				url: "#",
			},
			{
				title: "Service Accounts",
				url: "#",
			},
		],
	},
];

export function UnscopedSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<UnscopedSidebarHeader />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={unscopedNavMain} label="Server" />
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
		projectQueries.projectList({ size: 3 })
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
					asChild
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Link to="/projects">
						<Avatar className="size-8 shrink-0 rounded-md">
							<AvatarImage
								className="object-cover"
								src={getAvatarUrl(serverData.name || "")}
							/>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{serverData.name}</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
