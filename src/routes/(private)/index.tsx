import { projectQueries } from "@/data/projects";
import { getProjectFromLocalStorage } from "@/lib/projects";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/")({
	loader: async ({ context }) => {
		const projects = await context.queryClient.ensureQueryData(
			projectQueries.projectList()
		);
		const { items: projectItems } = projects;
		const localProjectId = getProjectFromLocalStorage();
		const selectedProject = projectItems.find(
			(project) =>
				project.id === localProjectId || project.name === localProjectId
		);
		if (selectedProject) {
			throw redirect({
				to: "/projects/$project_id",
				params: { project_id: selectedProject.name },
			});
		}
		throw redirect({ to: "/projects" });
	},
});
