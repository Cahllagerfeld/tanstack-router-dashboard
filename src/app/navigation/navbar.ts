import type { AppHotkey, HotkeySequence } from "@tanstack/react-hotkeys";
import type { LucideIcon } from "lucide-react";

export type NavbarItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	disabled?: boolean;
	/** When set, item is active if pathname starts with any of these prefixes (e.g. `/settings`). */
	activePathPrefixes?: string[];
	isActive?: boolean;
	hotkey?: AppHotkey<string, HotkeySequence>;
};
