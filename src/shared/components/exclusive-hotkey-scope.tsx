import { HotkeysProvider } from "@tanstack/react-hotkeys";
import { useId } from "react";
import type { ReactNode } from "react";

/**
 * Pauses every hotkey outside this subtree while it is mounted. Overlays use it
 * because focus traps do not stop letter keys from reaching `document`. Each
 * instance needs its own scope name, or stacked overlays would break.
 */
export function ExclusiveHotkeyScope({ children }: { children: ReactNode }) {
	const scope = useId();

	return (
		<HotkeysProvider scope={scope} exclusive>
			{children}
		</HotkeysProvider>
	);
}
