import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectDisplayName } from "@/lib/names";
import { Project } from "@/types/projects";
import { Link } from "@tanstack/react-router";
import { Hash } from "lucide-react";
import { ProjectActions } from "./project-actions";
import { SetProjectCommand } from "./set-project-command";

type Props = {
	project: Project;
};

export function ProjectItem({ project }: Props) {
	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-md">
			<div>
				<CardHeader className="flex flex-row items-start justify-between">
					<div>
						<CardTitle className="truncate text-xl font-semibold">
							{getProjectDisplayName(project)}
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
			</div>
			<Link
				to="/projects/$project_id"
				params={{ project_id: project.name }}
				className="absolute inset-0"
			></Link>
		</Card>
	);
}
