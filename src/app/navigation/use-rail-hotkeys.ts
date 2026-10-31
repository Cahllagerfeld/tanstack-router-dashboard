import { useHotkeys } from "@tanstack/react-hotkeys";
import { useNavigate } from "@tanstack/react-router";

import type { NavbarItem } from "./navbar";

/** A shortcut does what its rail link does, so it exists only with a live link. */
export function useRailHotkeys(items: NavbarItem[], enabled: boolean) {
	const navigate = useNavigate();

	useHotkeys(
		items.flatMap(({ hotkey, url, disabled }) =>
			hotkey && !disabled
				? [{ hotkey, callback: () => void navigate({ to: url }) }]
				: []
		),
		{ enabled }
	);
}
