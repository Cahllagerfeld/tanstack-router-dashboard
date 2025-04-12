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
