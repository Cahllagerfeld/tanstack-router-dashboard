const localStorageKey = "zenml.selected-workspace";

export function setWorkspaceToLocalStorage(workspace: string | null) {
	if (workspace === null) {
		localStorage.removeItem(localStorageKey);
	} else {
		localStorage.setItem(localStorageKey, workspace);
	}
}

export function getWorkspaceFromLocalStorage() {
	return localStorage.getItem(localStorageKey);
}
