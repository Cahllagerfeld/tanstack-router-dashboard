import { Skeleton } from "@/components/ui/skeleton";

export function ProjectListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<Skeleton key={index} className="h-[150px]" />
				))}
			</div>
			<div className="">
				<Skeleton className="mx-auto h-10 w-[250px]" />
			</div>
		</div>
	);
}
