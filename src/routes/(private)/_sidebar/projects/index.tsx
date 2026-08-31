import { projectQueries } from "@/data/projects";
import {
	createFilter,
	filterSchema,
	getFilterValue,
} from "@/features/filters/filter";
import { ProjectList } from "@/features/projects/overview/project-list";
import { ProjectListSkeleton } from "@/features/projects/overview/project-list-skeleton";
import { ProjectSearchbar } from "@/features/projects/overview/searchbar";
import { m } from "@/paraglide/messages";
import type { ProjectListQueries } from "@/types/projects";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { z } from "zod";

const querySchema = z.object({
	name: filterSchema.optional().catch(undefined),
	page: z.number().int().optional().catch(1),
});

export const Route = createFileRoute("/(private)/_sidebar/projects/")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { name, page } }) => ({ name, page }),
	loader: async ({ context: { queryClient }, deps: { name, page } }) => {
		await queryClient.ensureQueryData(projectQueries.list({ name, page }));
	},
	head: () => ({
		meta: [{ title: m.projects_list_title() }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate({
		from: "/projects/",
	});
	const { name, page } = Route.useSearch();

	function setQuery(name: string) {
		navigate({
			replace: true,
			params: true,
			search: {
				name: name ? createFilter("contains", name) : undefined,
			},
		});
	}

	const queries: ProjectListQueries = {
		name,
		page,
	};

	return (
		<div className="flex h-full flex-col space-y-4">
			<div>
				<h1 className="text-2xl font-bold">{m.projects_list_title()}</h1>
				<p className="text-muted-foreground text-sm">
					{m.projects_list_description()}
				</p>
			</div>
			<ProjectSearchbar
				value={getFilterValue(name ?? "")}
				onChange={setQuery}
			/>
			<Suspense fallback={<ProjectListSkeleton />}>
				<ProjectList queries={queries} />
			</Suspense>
		</div>
	);
}
