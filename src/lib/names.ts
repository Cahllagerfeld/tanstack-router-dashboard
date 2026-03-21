import { Project } from "@/domain/projects";

export function getProjectDisplayName(project: Project) {
	return project.displayName ?? project.name;
}
