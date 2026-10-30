import { Link } from "@tanstack/react-router";
import { Check, Plus, Trash2 } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/domain/projects";
import { CreateProjectDialog } from "@/features/projects/create/dialog/create-project-dialog";
import { DeleteProjectAlert } from "@/features/projects/delete/delete-project-alert";
import { getEntityIcon } from "@/lib/constants/entity-icons";
import { getIllustrationUrl } from "@/lib/images";
import { getProjectLabel } from "@/lib/projects";
import { m } from "@/paraglide/messages";

import { railAvatarClassName, railAvatarTriggerClassName } from "./rail-avatar";
import { RailTooltip } from "./rail-tooltip";
import { useProjectSwitcher } from "./use-project-switcher";

const ProjectIcon = getEntityIcon("project");

export function RailProjectSwitcher() {
	const {
		projects,
		activeProject,
		createDialogOpen,
		setCreateDialogOpen,
		projectToDelete,
		setProjectToDelete,
	} = useProjectSwitcher();
	const label = activeProject
		? m.projects_switcher_label({ name: getProjectLabel(activeProject) })
		: m.projects_switcher_select();

	return (
		<>
			<CreateProjectDialog
				open={createDialogOpen}
				setOpen={setCreateDialogOpen}
			/>
			{projectToDelete && (
				<DeleteProjectAlert
					project={projectToDelete}
					onClose={() => setProjectToDelete(null)}
				/>
			)}
			<DropdownMenu>
				<RailTooltip
					label={label}
					trigger={
						<DropdownMenuTrigger
							render={
								<Button
									variant="ghost"
									size="icon-lg"
									aria-label={label}
									className={
										activeProject
											? railAvatarTriggerClassName
											: "hover:bg-foreground/10 dark:hover:bg-foreground/10"
									}
								>
									<ProjectAvatar project={activeProject} />
								</Button>
							}
						/>
					}
				/>
				<DropdownMenuContent
					className="min-w-56 rounded-lg"
					align="start"
					side="right"
					sideOffset={4}
				>
					{projects.length > 0 && (
						<>
							<DropdownMenuGroup>
								<DropdownMenuLabel className="text-xs text-muted-foreground">
									{m.projects_navigation_label()}
								</DropdownMenuLabel>
								{projects.map((project) => (
									<DropdownMenuItem
										key={project.id}
										render={
											<Link
												to="/projects/$project_id/runs"
												params={{ project_id: project.name }}
											/>
										}
										aria-current={
											project.id === activeProject?.id ? "true" : undefined
										}
										className="gap-2 p-2"
									>
										<Avatar className="size-6 shrink-0 rounded-md">
											<AvatarImage src={getIllustrationUrl(project.name)} />
										</Avatar>
										<span className="truncate">{getProjectLabel(project)}</span>
										{project.id === activeProject?.id && (
											<Check aria-hidden="true" className="ml-auto" />
										)}
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
						</>
					)}
					<DropdownMenuItem
						onClick={() => setCreateDialogOpen(true)}
						className="gap-2 p-2"
					>
						<div className="flex size-6 items-center justify-center rounded-md border bg-background">
							<Plus className="size-4" />
						</div>
						<div className="font-medium text-muted-foreground">
							{m.projects_create_title()}
						</div>
					</DropdownMenuItem>
					{activeProject && (
						<DropdownMenuItem
							onClick={() => setProjectToDelete(activeProject)}
							className="gap-2 p-2"
						>
							<div className="flex size-6 items-center justify-center">
								<Trash2 className="size-4 text-muted-foreground" />
							</div>
							<div className="font-medium text-muted-foreground">
								{m.projects_navigation_delete()}
							</div>
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}

function ProjectAvatar({ project }: { project: Project | undefined }) {
	if (!project) return <ProjectIcon aria-hidden="true" />;

	return (
		<Avatar className={railAvatarClassName}>
			<AvatarImage src={getIllustrationUrl(project.name)} />
		</Avatar>
	);
}
