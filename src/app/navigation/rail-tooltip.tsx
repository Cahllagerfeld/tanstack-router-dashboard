import type { ReactElement } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

const RAIL_TOOLTIP_DELAY = 400;

export function RailTooltip({
	label,
	trigger,
}: {
	label: string;
	trigger: ReactElement;
}) {
	return (
		<Tooltip>
			<TooltipTrigger delay={RAIL_TOOLTIP_DELAY} render={trigger} />
			<TooltipContent side="right" sideOffset={8}>
				{label}
			</TooltipContent>
		</Tooltip>
	);
}
