import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
	className?: string;
}>;

/** The page gutter. The shell runs edge to edge, so inset content opts in here. */
export function ContentInset({ className, children }: Props) {
	return <div className={cn("p-4", className)}>{children}</div>;
}
