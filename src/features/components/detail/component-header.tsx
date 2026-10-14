import type { Component } from "@/domain/components";
import { CopyButton } from "@/shared/components/copy-button";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { snakeCaseToTitleCase } from "@/shared/lib/strings";

interface ComponentHeaderProps {
	component: Component;
}

export function ComponentHeader({ component }: ComponentHeaderProps) {
	const { flavor, type } = component;

	return (
		<div className="space-y-1">
			<div className="flex items-center gap-3">
				{flavor?.logoUrl && (
					<img src={flavor.logoUrl} alt={flavor.name} className="size-8" />
				)}

				<h1 className="text-2xl font-bold">{component.name}</h1>

				{type && (
					<Badge variant="secondary">{snakeCaseToTitleCase(type)}</Badge>
				)}
			</div>

			<div className="flex items-center gap-1 text-sm text-muted-foreground">
				<span>{component.id}</span>
				<CopyButton value={component.id} />
			</div>
		</div>
	);
}

export function ComponentHeaderSkeleton() {
	return (
		<div className="space-y-1">
			<div className="flex items-center gap-3">
				<Skeleton className="size-8 rounded" />
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-5 w-24" />
			</div>
			<Skeleton className="h-4 w-72" />
		</div>
	);
}
