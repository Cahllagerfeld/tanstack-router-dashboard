import { getLocalStorageKey } from "@/shared/lib/localstorage";

const enabledKey = getLocalStorageKey("KEYBOARD_SHORTCUTS_ENABLED");
const listeners = new Set<() => void>();

/** Shortcuts stay on unless this browser explicitly turned them off. */
export function getKeyboardShortcutsEnabled() {
	return localStorage.getItem(enabledKey) !== "false";
}

export function setKeyboardShortcutsEnabled(enabled: boolean) {
	localStorage.setItem(enabledKey, String(enabled));
	for (const listener of listeners) listener();
}

/** Notifies on changes from this tab and, through `storage`, from other tabs. */
export function subscribeToKeyboardShortcutsEnabled(listener: () => void) {
	listeners.add(listener);
	window.addEventListener("storage", listener);

	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", listener);
	};
}
