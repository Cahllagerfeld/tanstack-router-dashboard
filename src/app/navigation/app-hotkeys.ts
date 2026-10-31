import { defineAppHotkeys } from "@tanstack/react-hotkeys";

import { m } from "@/paraglide/messages";

/** The only place the application's hotkey bindings are listed. */
export const appHotkeys = defineAppHotkeys({
	"navigation.pipelines": {
		hotkey: ["G", "P"],
		meta: { name: m.keyboard_shortcuts_go_to_pipelines() },
	},
	"navigation.runs": {
		hotkey: ["G", "R"],
		meta: { name: m.keyboard_shortcuts_go_to_runs() },
	},
	"navigation.infra": {
		hotkey: ["G", "I"],
		meta: { name: m.keyboard_shortcuts_go_to_infra() },
	},
	"navigation.settings": {
		hotkey: ["G", "S"],
		meta: { name: m.keyboard_shortcuts_go_to_settings() },
	},
});
