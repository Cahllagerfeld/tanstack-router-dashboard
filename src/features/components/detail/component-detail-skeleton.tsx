import { ContentInset } from "@/shared/components/content-inset";
import { DetailLayoutSkeleton } from "@/shared/components/detail-layout";
import { Skeleton } from "@/shared/ui/skeleton";

export function ComponentDetailSkeleton() {
	return (
		<>
			<DetailLayoutSkeleton />
			<ContentInset className="space-y-4">
				<Skeleton className="h-12 w-96" />
				<Skeleton className="h-12 w-96" />
				<Skeleton className="h-12 w-96" />
			</ContentInset>
		</>
	);
}
