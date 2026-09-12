import { Link } from "@tanstack/react-router";
import { type LucideIcon, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

import { DeleteProjectAlert } from "@/features/projects/delete/delete-project-alert";
import { m } from "@/paraglide/messages";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/shared/components/ui/sidebar";

export function NavProjects({
	projects,
}: {
	projects: {
		id: string;
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}) {
	return (
		<>
			<SidebarGroup className="group-data-[collapsible=icon]:hidden">
				<SidebarGroupLabel>{m.projects_navigation_label()}</SidebarGroupLabel>
				<SidebarMenu>
					{projects.map((item) => (
						<SidebarMenuItem key={item.name}>
							<SidebarMenuButton
								render={
									<Link to={item.url}>
										<item.icon />
										<span>{item.name}</span>
									</Link>
								}
							></SidebarMenuButton>
							<ProjectMenuDropdown projectId={item.id} />
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
}

export function ProjectMenuDropdown({ projectId }: { projectId: string }) {
	const { isMobile } = useSidebar();
	const [deleteOpen, setDeleteOpen] = useState(false);
	return (
		<>
			<DeleteProjectAlert
				projectId={projectId}
				open={deleteOpen}
				setOpen={setDeleteOpen}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<SidebarMenuAction showOnHover>
							<MoreHorizontal />
							<span className="sr-only">{m.common_navigation_more()}</span>
						</SidebarMenuAction>
					}
				></DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-48"
					side={isMobile ? "bottom" : "right"}
					align={isMobile ? "end" : "start"}
				>
					<DropdownMenuItem onClick={() => setDeleteOpen(true)}>
						<Trash2 className="text-muted-foreground" />
						<span>{m.projects_navigation_delete()}</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
