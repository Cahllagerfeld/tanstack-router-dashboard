const localStorageKey = "zenml.selected-workspace";

export function setProjectToLocalStorage(project: string | null) {
	if (project === null) {
		localStorage.removeItem(localStorageKey);
	} else {
		localStorage.setItem(localStorageKey, project);
	}
}

export function getProjectFromLocalStorage() {
	return localStorage.getItem(localStorageKey);
}
