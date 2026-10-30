import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
	/** Names the page for assistive tech; list pages have no visible heading. */
	title?: string;
	className?: string;
}>;

/** Runs a list edge to edge by cancelling the shell's content padding. */
export function TableView({ title, className, children }: Props) {
	return (
		<div className={cn("-m-4 flex min-w-0 flex-col", className)}>
			{title ? <h1 className="sr-only">{title}</h1> : null}
			{children}
		</div>
	);
}
