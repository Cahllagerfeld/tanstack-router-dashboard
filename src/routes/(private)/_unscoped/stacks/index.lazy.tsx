import { Skeleton } from "@/components/ui/skeleton";
import { StackListTable } from "@/features/stacks/list/table";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createLazyFileRoute("/(private)/_unscoped/stacks/")({
	component: RouteComponent,
	pendingComponent: Pending,
});

function Pending() {
	return <p>Pending...</p>;
}

function RouteComponent() {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Stacks</h1>
				<p className="text-sm text-muted-foreground">
					Stacks are collections of components.
				</p>
			</div>
			<Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
				<StackListTable />
			</Suspense>
		</div>
	);
}
