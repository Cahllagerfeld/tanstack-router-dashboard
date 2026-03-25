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
import { serverQueries } from "@/data/server";
import { getAvatarUrl } from "@/lib/avatar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useNavbarItems } from "./use-navbar-items";

export function UnscopedSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { navItems, projectPreviewItems } = useNavbarItems();

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<UnscopedSidebarHeader />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems} label="Server" />
				<NavMain items={projectPreviewItems} label="Project (Preview)" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
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
