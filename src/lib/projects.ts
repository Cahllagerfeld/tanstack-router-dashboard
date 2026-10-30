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

export function getProjectLabel(project: Project) {
	return project.displayName ?? project.name;
}

/** The Project to open by default: the last opened one, otherwise the first listed. */
export function resolveProject(
	projects: Project[],
	lastOpenedIdOrName: string | null
) {
	return findProject(projects, lastOpenedIdOrName) ?? projects[0];
}

/**
 * The active Project outside of a Project route. A list that failed or is still
 * refreshing cannot prove the last opened Project is gone, so nothing is active.
 */
export function resolveUnscopedProject(
	projects: Project[],
	lastOpenedIdOrName: string | null,
	isListCurrent: boolean
) {
	const isUnconfirmedAbsence =
		lastOpenedIdOrName !== null &&
		!isListCurrent &&
		!findProject(projects, lastOpenedIdOrName);

	return isUnconfirmedAbsence
		? undefined
		: resolveProject(projects, lastOpenedIdOrName);
}
