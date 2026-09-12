import type { PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";

type TableToolbarProps = PropsWithChildren<{
	className?: string;
}>;

function TableToolbarRoot({ children, className }: TableToolbarProps) {
	return (
		<div className={cn("flex flex-wrap items-center gap-2", className)}>
			{children}
		</div>
	);
}

function TableToolbarStart({ children, className }: TableToolbarProps) {
	return (
		<div className={cn("flex min-w-0 flex-1 items-center gap-2", className)}>
			{children}
		</div>
	);
}

function TableToolbarEnd({ children, className }: TableToolbarProps) {
	return (
		<div className={cn("ml-auto flex items-center gap-2", className)}>
			{children}
		</div>
	);
}

export const TableToolbar = Object.assign(TableToolbarRoot, {
	Start: TableToolbarStart,
	End: TableToolbarEnd,
});
