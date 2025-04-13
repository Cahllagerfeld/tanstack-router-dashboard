import { createFilter, getFilterValue } from "@/features/filters/filter";
import { ProjectList } from "@/features/projects/overview/project-list";
import { ProjectListSkeleton } from "@/features/projects/overview/project-list-skeleton";
import { ProjectSearchbar } from "@/features/projects/overview/searchbar";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createLazyFileRoute("/(private)/_unscoped/projects")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate({
		from: "/projects",
	});
	const { name } = Route.useSearch();

	function setQuery(name: string) {
		navigate({
			replace: true,
			params: true,
			search: {
				name: !!name ? createFilter("contains", name) : undefined,
			},
		});
	}

	return (
		<div className="flex h-full flex-col space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Projects</h1>
				<p className="text-sm text-muted-foreground">
					Projects allow you to organize your MLOps resources.
				</p>
			</div>
			<ProjectSearchbar
				value={getFilterValue(name ?? "")}
				onChange={setQuery}
			/>
			<Suspense fallback={<ProjectListSkeleton />}>
				<ProjectList queries={{ name }} />
			</Suspense>
		</div>
	);
}
