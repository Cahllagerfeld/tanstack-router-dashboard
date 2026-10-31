import type { ReactElement } from "react";

import { Kbd, KbdGroup } from "@/shared/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

const RAIL_TOOLTIP_DELAY = 400;

export function RailTooltip({
	label,
	trigger,
	hotkey,
}: {
	label: string;
	trigger: ReactElement;
	/** Key sequence shown after the label, such as `["G", "P"]`. */
	hotkey?: readonly string[];
}) {
	return (
		<Tooltip>
			<TooltipTrigger delay={RAIL_TOOLTIP_DELAY} render={trigger} />
			<TooltipContent side="right" sideOffset={8}>
				{label}
				{hotkey && (
					// aria-keyshortcuts cannot express a sequence: a space separates alternatives.
					<KbdGroup aria-hidden="true">
						{hotkey.map((key) => (
							<Kbd key={key}>{key}</Kbd>
						))}
					</KbdGroup>
				)}
			</TooltipContent>
		</Tooltip>
	);
}
