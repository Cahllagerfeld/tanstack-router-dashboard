import type { Component } from "@/types/components";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { Skeleton } from "@/components/ui/skeleton";
import { snakeCaseToTitleCase } from "@/lib/strings";

interface ComponentHeaderProps {
	component: Component;
}

export function ComponentHeader({ component }: ComponentHeaderProps) {
	const { body, resources } = component;

	return (
		<div className="space-y-1">
			<div className="flex items-center gap-3">
				{resources?.flavor?.body?.logo_url && (
					<img
						src={resources.flavor.body.logo_url}
						alt={resources.flavor.name}
						className="size-8"
					/>
				)}

				<h1 className="text-2xl font-bold">{component.name}</h1>

				{body?.type && (
					<Badge variant="secondary">{snakeCaseToTitleCase(body.type)}</Badge>
				)}
			</div>

			<div className="text-muted-foreground flex items-center gap-1 text-sm">
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
