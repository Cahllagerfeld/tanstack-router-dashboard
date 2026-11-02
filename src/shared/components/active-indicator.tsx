import * as motion from "motion/react-m";

import { cn } from "@/shared/lib/cn";

/**
 * Marks the active item of a navigation and slides to the next one. Render it
 * inside the active item only, positioned by `className`; items sharing a
 * `layoutId` hand the indicator to each other.
 */
export function ActiveIndicator({
	layoutId,
	className,
}: {
	layoutId: string;
	className?: string;
}) {
	return (
		<motion.span
			layoutId={layoutId}
			aria-hidden="true"
			transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
			className={cn("pointer-events-none absolute", className)}
		/>
	);
}
