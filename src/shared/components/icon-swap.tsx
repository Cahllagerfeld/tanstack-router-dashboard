import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-m";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

const hidden = { opacity: 0, scale: 0.5, filter: "blur(2px)" };
const shown = { opacity: 1, scale: 1, filter: "blur(0px)" };

/** Crossfades between icons when `swapKey` changes, such as Copy to Check. */
export function IconSwap({
	swapKey,
	children,
	className,
}: {
	swapKey: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<AnimatePresence mode="popLayout" initial={false}>
			<motion.span
				key={swapKey}
				initial={hidden}
				animate={shown}
				exit={hidden}
				transition={{ type: "spring", duration: 0.3, bounce: 0 }}
				className={cn("inline-flex", className)}
			>
				{children}
			</motion.span>
		</AnimatePresence>
	);
}
