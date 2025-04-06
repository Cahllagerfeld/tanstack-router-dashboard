import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { projectQueries } from "@/data/projects";
import { serverQueries } from "@/data/server";
import { CreateProjectDialog } from "@/features/create-project/create-project-dialog";
import { getAvatarUrl } from "@/lib/avatar";
import { setProjectToLocalStorage } from "@/lib/projects";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

export function ProjectSwitcher() {
	const [projectDialogOpen, setProjectDialogOpen] = useState(false);
	const navigate = useNavigate();
	const { data: serverData } = useSuspenseQuery(serverQueries.serverInfo());
	const { data: projectData } = useSuspenseQuery(projectQueries.projectList());
	const { project_id } = useParams({
		from: "/(private)/$project_id",
	});

	const activeProject = projectData.items.find(
		(project) => project.id === project_id
	)?.name;

	const { isMobile } = useSidebar();

	return (
		<>
			<CreateProjectDialog
				open={projectDialogOpen}
				setOpen={setProjectDialogOpen}
			/>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="size-8 shrink-0 rounded-md">
									<AvatarImage
										src={getAvatarUrl(activeProject || "", {
											size: 32,
										})}
									/>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{serverData.name}
									</span>
									<span className="truncate text-xs">{activeProject}</span>
								</div>
								<ChevronsUpDown className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
							align="start"
							side={isMobile ? "bottom" : "right"}
							sideOffset={4}
						>
							<DropdownMenuLabel className="text-xs text-muted-foreground">
								Projects
							</DropdownMenuLabel>
							{projectData.items.map((project, index) => (
								<DropdownMenuItem
									key={project.id}
									onClick={() => {
										setProjectToLocalStorage(project.id);
										navigate({
											to: "/$project_id",
											params: { project_id: project.id },
										});
									}}
									className="gap-2 p-2"
								>
									<Avatar className="size-6 shrink-0 rounded-md">
										<AvatarImage
											src={getAvatarUrl(project.name, { size: 24 })}
										/>
									</Avatar>

									<span className="truncate">{project.name}</span>
									<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => setProjectDialogOpen(true)}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-md border bg-background">
									<Plus className="size-4" />
								</div>
								<div className="font-medium text-muted-foreground">
									Create Project
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</>
	);
}
