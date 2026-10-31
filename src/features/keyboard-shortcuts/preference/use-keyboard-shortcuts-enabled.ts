import { useSyncExternalStore } from "react";

import {
	getKeyboardShortcutsEnabled,
	setKeyboardShortcutsEnabled,
	subscribeToKeyboardShortcutsEnabled,
} from "./storage";

export function useKeyboardShortcutsEnabled() {
	const enabled = useSyncExternalStore(
		subscribeToKeyboardShortcutsEnabled,
		getKeyboardShortcutsEnabled
	);

	return { enabled, setEnabled: setKeyboardShortcutsEnabled };
}
