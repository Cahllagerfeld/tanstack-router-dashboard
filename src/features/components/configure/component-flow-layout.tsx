import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

/** Content column width per kind of step: tiles want room, a form reads best narrow. */
const FLOW_WIDTHS = {
	type: "max-w-3xl",
	flavor: "max-w-[53.75rem]",
	configure: "max-w-[40rem]",
} as const;

export type FlowWidth = keyof typeof FLOW_WIDTHS;

type ComponentFlowLayoutProps = {
	title: string;
	/** Beside the title, such as a docs link. */
	titleAside?: ReactNode;
	/** Compact position such as "Step 2 of 3 · Flavor", shown only where the sidebar is hidden. */
	progress?: string;
	/** Steps sidebar on the left. Omit for a single-step flow such as edit. */
	sidebar?: ReactNode;
	width: FlowWidth;
	/** Action row pinned below the content: Back or Cancel first, the primary action last. */
	footer: ReactNode;
	children: ReactNode;
};

/**
 * Full-height flow shell shared by creating and editing a Component: an optional steps sidebar, then a centered
 * content column whose footer stays pinned to the bottom of the workspace.
 */
export function ComponentFlowLayout({
	title,
	titleAside,
	progress,
	sidebar,
	width,
	footer,
	children,
}: ComponentFlowLayoutProps) {
	const widthClass = FLOW_WIDTHS[width];

	return (
		<div className="flex min-w-0 flex-1">
			{sidebar}
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex-1 px-4 pt-6 pb-6 sm:px-8">
					<div className={cn("mx-auto flex w-full flex-col gap-6", widthClass)}>
						<header className="flex flex-col gap-1">
							{progress ? (
								<p
									className={cn(
										"text-xs text-muted-foreground",
										sidebar && "md:hidden"
									)}
								>
									{progress}
								</p>
							) : null}
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
								<h1 className="text-xl font-medium tracking-tight">{title}</h1>
								{titleAside}
							</div>
						</header>
						{children}
					</div>
				</div>
				<footer className="sticky bottom-0 z-10 border-t bg-background px-4 py-3 sm:px-8">
					<div
						className={cn(
							"mx-auto flex w-full items-center justify-between gap-2",
							widthClass
						)}
					>
						{footer}
					</div>
				</footer>
			</div>
		</div>
	);
}
