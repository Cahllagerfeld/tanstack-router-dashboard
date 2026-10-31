import { useId } from "react";

import { m } from "@/paraglide/messages";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
} from "@/shared/ui/field";
import { Switch } from "@/shared/ui/switch";

import { useKeyboardShortcutsEnabled } from "./use-keyboard-shortcuts-enabled";

export function KeyboardShortcutsSetting() {
	const id = useId();
	const { enabled, setEnabled } = useKeyboardShortcutsEnabled();

	return (
		<Field orientation="horizontal" className="max-w-xl">
			<FieldContent>
				<FieldLabel htmlFor={id}>
					{m.keyboard_shortcuts_setting_label()}
				</FieldLabel>
				<FieldDescription>
					{m.keyboard_shortcuts_setting_description()}
				</FieldDescription>
			</FieldContent>
			<Switch id={id} checked={enabled} onCheckedChange={setEnabled} />
		</Field>
	);
}
