import { Link } from "@tanstack/react-router";
import { Hash } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/domain/projects";

import { ProjectActions } from "./project-actions";
import { SetProjectCommand } from "./set-project-command";

type Props = {
	project: Project;
};

export function ProjectItem({ project }: Props) {
	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-md">
			<CardHeader className="flex flex-row items-start justify-between">
				<div>
					<CardTitle className="truncate text-xl font-semibold">
						{project.displayName}
					</CardTitle>
					<div className="flex items-center gap-0.5 text-sm text-muted-foreground">
						<Hash
							width={16}
							height={16}
							className="shrink-0 stroke-muted-foreground"
						/>
						<p className="truncate">{project.name}</p>
					</div>
				</div>
				<ProjectActions projectId={project.name} />
			</CardHeader>
			<CardContent>
				<SetProjectCommand projectId={project.name} />
			</CardContent>

			<Link
				to="/projects/$project_id"
				params={{ project_id: project.name }}
				className="absolute inset-0"
			></Link>
		</Card>
	);
}
