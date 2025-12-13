import { Skeleton } from "@/components/ui/skeleton";
import { ComponentHeaderSkeleton } from "./component-header";

export function ComponentDetailSkeleton() {
	return (
		<div className="space-y-6">
			<ComponentHeaderSkeleton />

			<div className="space-y-6">
				<Skeleton className="h-10 w-48" />

				<div className="grid gap-6 md:grid-cols-2">
					<Skeleton className="h-[300px]" />
					<Skeleton className="h-[400px]" />
					<Skeleton className="h-[200px]" />
					<Skeleton className="h-[150px]" />
				</div>
			</div>
		</div>
	);
}
