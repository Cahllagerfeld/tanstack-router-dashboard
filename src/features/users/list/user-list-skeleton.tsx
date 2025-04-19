import { Skeleton } from "@/components/ui/skeleton";

export function UserListSkeleton() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-[250px] w-full" />
			<div className="">
				<Skeleton className="mx-auto h-10 w-[250px]" />
			</div>
		</div>
	);
}
