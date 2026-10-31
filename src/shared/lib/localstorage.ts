const LOCALSTORAGE_PREFIX = "zenml";

const LOCALSTORAGE_KEYS = {
	SELECTED_PROJECT: "projects.selected",
	AUTH_USER: "auth.user",
	KEYBOARD_SHORTCUTS_ENABLED: "keyboard-shortcuts.enabled",
} as const;

export function getLocalStorageKey(key: keyof typeof LOCALSTORAGE_KEYS) {
	return `${LOCALSTORAGE_PREFIX}.${LOCALSTORAGE_KEYS[key]}` as const;
}
