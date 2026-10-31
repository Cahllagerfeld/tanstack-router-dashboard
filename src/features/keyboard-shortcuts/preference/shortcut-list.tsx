import { useAppHotkeyList } from "@tanstack/react-hotkeys";
import { Fragment } from "react";

import { m } from "@/paraglide/messages";
import { cn } from "@/shared/lib/cn";
import { Kbd, KbdGroup } from "@/shared/ui/kbd";

/** Every shortcut in the `HotkeysProvider` registry, dimmed while shortcuts are off. */
export function ShortcutList({ enabled }: { enabled: boolean }) {
	const hotkeys = useAppHotkeyList();

	return (
		<ul
			className={cn(
				"grid gap-x-8 gap-y-2.5 rounded-lg bg-muted/50 p-3 transition-opacity md:grid-cols-2",
				!enabled && "opacity-40"
			)}
		>
			{hotkeys.map(({ appHotkey }) => (
				<li
					key={appHotkey.id}
					className="flex items-center justify-between gap-4 text-sm"
				>
					<span>{appHotkey.meta?.name}</span>
					<KbdGroup>
						{[appHotkey.hotkey ?? []].flat().map((key, index) => (
							<Fragment key={key}>
								{index > 0 && (
									<span className="text-xs text-muted-foreground">
										{m.keyboard_shortcuts_sequence_then()}
									</span>
								)}
								<Kbd>{key}</Kbd>
							</Fragment>
						))}
					</KbdGroup>
				</li>
			))}
		</ul>
	);
}
