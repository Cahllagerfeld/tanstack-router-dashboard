import { Project } from "@/types/projects";
import { User } from "@/types/user";

export function getUsername(user: User) {
	return user.body?.full_name || user.name;
}

export function getProjectDisplayName(project: Project) {
	return project.body?.display_name || project.name;
}
