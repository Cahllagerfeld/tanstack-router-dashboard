import type { ReactNode } from "react";

import { CopyButton } from "@/shared/components/copy-button";
import { type GroupTab, GroupTabs } from "@/shared/components/group-tabs";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";

export type DetailFact = {
	label: string;
	value: ReactNode;
};

type DetailLayoutProps = {
	title: string;
	id: string;
	media?: ReactNode;
	actions?: ReactNode;
	tags?: string[];
	facts: DetailFact[];
	tabsLabel: string;
	tabs: GroupTab[];
	children: ReactNode;
};

/** The frame of every Detail Screen. See docs/agents/detail-screens.md. */
export function DetailLayout({
	title,
	id,
	media,
	actions,
	tags = [],
	facts,
	tabsLabel,
	tabs,
	children,
}: DetailLayoutProps) {
	return (
		<>
			<header className="space-y-2 border-b px-4 py-3">
				<div className="flex items-center gap-3">
					{media}
					<div className="min-w-0 flex-1">
						<h1 className="truncate text-lg font-semibold">{title}</h1>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<span className="truncate">{id}</span>
							<CopyButton value={id} />
						</div>
					</div>
					{actions}
				</div>
				{tags.length > 0 && (
					<ul className="flex flex-wrap gap-1">
						{tags.map((tag) => (
							<li key={tag}>
								<Badge variant="secondary">{tag}</Badge>
							</li>
						))}
					</ul>
				)}
			</header>
			<dl className="flex flex-wrap gap-x-10 gap-y-3 border-b px-4 py-3">
				{facts.map((fact) => (
					<div key={fact.label} className="min-w-0 space-y-0.5">
						<dt className="text-xs text-muted-foreground">{fact.label}</dt>
						<dd className="text-sm">{fact.value}</dd>
					</div>
				))}
			</dl>
			<div className="sticky top-0 z-10 bg-background">
				<GroupTabs label={tabsLabel} tabs={tabs} />
			</div>
			{children}
		</>
	);
}

export function DetailLayoutSkeleton() {
	return (
		<>
			<div className="space-y-2 border-b px-4 py-3">
				<Skeleton className="h-7 w-48" />
				<Skeleton className="h-4 w-72" />
			</div>
			<div className="flex gap-10 border-b px-4 py-3">
				<Skeleton className="h-10 w-24" />
				<Skeleton className="h-10 w-24" />
				<Skeleton className="h-10 w-24" />
				<Skeleton className="h-10 w-24" />
			</div>
			<div className="flex h-11 items-center gap-5 border-b px-4">
				<Skeleton className="h-5 w-24" />
				<Skeleton className="h-5 w-16" />
			</div>
		</>
	);
}
