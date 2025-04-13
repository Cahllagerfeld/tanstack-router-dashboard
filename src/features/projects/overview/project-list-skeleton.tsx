import { Skeleton } from "@/components/ui/skeleton";

export function ProjectListSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
			{Array.from({ length: 6 }).map((_, index) => (
				<Skeleton key={index} className="h-[150px]" />
			))}
		</div>
	);
}
