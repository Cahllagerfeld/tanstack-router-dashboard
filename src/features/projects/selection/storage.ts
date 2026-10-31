import { getLocalStorageKey } from "@/shared/lib/localstorage";

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

/** Links preload on hover, which must not count as opening the Project. */
export function rememberOpenedProject(projectId: string, preload: boolean) {
	if (!preload) setProjectToLocalStorage(projectId);
}
