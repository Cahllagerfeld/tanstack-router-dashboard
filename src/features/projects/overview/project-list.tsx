import { Pagination } from "@/components/pagination";
import { projectQueries } from "@/data/projects";
import { ProjectListQueries } from "@/types/projects";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProjectItem } from "./project-item";
import { ProjectListNoItemsFallback } from "./project-list-no-items-fallback";

type Props = {
	queries: ProjectListQueries;
};

export function ProjectList({ queries }: Props) {
	const { data: projectData } = useSuspenseQuery(
		projectQueries.projectList(queries)
	);

	const hasProjects = projectData.total > 0;

	if (!hasProjects) {
		return <ProjectListNoItemsFallback />;
	}

	return (
		<div className="space-y-4">
			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{projectData.items.map((project) => (
					<li key={project.id}>
						<ProjectItem project={project} />
					</li>
				))}
			</ul>
			{/* <Pagination
				index={projectData.index}
				totalPages={projectData.total_pages}
			/> */}
		</div>
	);
}
