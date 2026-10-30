import type { Project } from "@/domain/projects";

import { getLocalStorageKey } from "./localstorage";

const activeProjectKey = getLocalStorageKey("SELECTED_PROJECT");

export function setProjectToLocalStorage(project: string | null) {
	if (project === null) {
		localStorage.removeItem(activeProjectKey);
	} else {
		localStorage.setItem(activeProjectKey, project);
	}
}

export function getProjectFromLocalStorage() {
	return localStorage.getItem(activeProjectKey);
}

export function findProject(projects: Project[], idOrName: string | null) {
	return projects.find(
		(project) => project.id === idOrName || project.name === idOrName
	);
}

/** The Project to open by default: the last opened one, otherwise the first listed. */
export function resolveProject(
	projects: Project[],
	lastOpenedIdOrName: string | null
) {
	return findProject(projects, lastOpenedIdOrName) ?? projects[0];
}
