import { projectQueries } from "@/data/projects";
import { CreateProjectDialogWithTrigger } from "@/features/projects/create/dialog/create-project-dialog";
import { ProjectItem } from "@/features/projects/overview/project-item";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(private)/_unscoped/projects")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: projectData } = useSuspenseQuery(projectQueries.projectList());
	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<CreateProjectDialogWithTrigger />
			</div>
			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{projectData.items.map((project) => (
					<li key={project.id}>
						<ProjectItem project={project} />
					</li>
				))}
			</ul>
		</div>
	);
}
