const LOCALSTORAGE_PREFIX = "zenml";

const LOCALSTORAGE_KEYS = {
	SELECTED_PROJECT: "selected-project",
} as const;

export function getLocalStorageKey(key: keyof typeof LOCALSTORAGE_KEYS) {
	return `${LOCALSTORAGE_PREFIX}.${LOCALSTORAGE_KEYS[key]}`;
}
