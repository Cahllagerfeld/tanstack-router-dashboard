import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { DeleteProjectAlert } from "@/features/projects/delete/delete-project-alert";
import { Link } from "@tanstack/react-router";
import { MoreHorizontal, Trash2, type LucideIcon } from "lucide-react";
import { useState } from "react";

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
				<SidebarGroupLabel>Projects</SidebarGroupLabel>
				<SidebarMenu>
					{projects.map((item) => (
						<SidebarMenuItem key={item.name}>
							<SidebarMenuButton asChild>
								<Link to={item.url}>
									<item.icon />
									<span>{item.name}</span>
								</Link>
							</SidebarMenuButton>
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
				<DropdownMenuTrigger asChild>
					<SidebarMenuAction showOnHover>
						<MoreHorizontal />
						<span className="sr-only">More</span>
					</SidebarMenuAction>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-48"
					side={isMobile ? "bottom" : "right"}
					align={isMobile ? "end" : "start"}
				>
					<DropdownMenuItem onSelect={() => setDeleteOpen(true)}>
						<Trash2 className="text-muted-foreground" />
						<span>Delete Project</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
