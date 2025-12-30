import { userQueries } from "@/data/user";
import { filterSchema } from "@/features/filters/filter";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guards";
import { z } from "zod";
import { createFilter, getFilterValue } from "@/features/filters/filter";
import { UserListSearchbar } from "@/features/users/list/searchbar";
import { UserList } from "@/features/users/list/user-list";
import { UserListSkeleton } from "@/features/users/list/user-list-skeleton";
import { UserListQueryParams } from "@/types/user";
import { Suspense } from "react";

const querySchema = z.object({
	name: filterSchema.optional().catch(undefined),
	page: z.number().optional().catch(1),
});

export const Route = createFileRoute("/(private)/_unscoped/settings/members")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { name, page } }) => ({ name, page }),
	beforeLoad: async ({ context: { queryClient } }) => {
		await requireAuth(queryClient);
	},
	loader: async ({ context: { queryClient }, deps: { name, page } }) => {
		await Promise.all([
			queryClient.ensureQueryData(userQueries.list({ name, page })),
			queryClient.ensureQueryData(userQueries.currentUser()),
		]);
	},
	head: () => ({
		meta: [{ title: "Members" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { name, page } = Route.useSearch();
	const navigate = useNavigate({ from: "/settings/members" });
	const queries: UserListQueryParams = {
		name,
		page,
	};

	function setSearchValue(name: string) {
		navigate({
			replace: true,
			params: true,
			search: {
				name: name ? createFilter("contains", name) : undefined,
			},
		});
	}

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold">Members</h1>
				<p className="text-muted-foreground text-sm">
					Manage your team members and their access to your server.
				</p>
			</div>
			<UserListSearchbar
				searchValue={getFilterValue(name ?? "")}
				onChange={setSearchValue}
			/>
			<Suspense fallback={<UserListSkeleton />}>
				<UserList queries={queries} />
			</Suspense>
		</div>
	);
}
