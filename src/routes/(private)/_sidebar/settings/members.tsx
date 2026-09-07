import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { z } from "zod";

import { userQueries } from "@/data/user";
import {
	createFilter,
	filterSchema,
	getFilterValue,
} from "@/features/filters/filter";
import { UserListSearchbar } from "@/features/users/list/searchbar";
import { UserList } from "@/features/users/list/user-list";
import { UserListSkeleton } from "@/features/users/list/user-list-skeleton";
import { m } from "@/paraglide/messages";
import type { UserListQueryParams } from "@/types/user";

const querySchema = z.object({
	name: filterSchema.optional().catch(undefined),
	page: z.number().int().optional().catch(1),
});

export const Route = createFileRoute("/(private)/_sidebar/settings/members")({
	validateSearch: querySchema,
	loaderDeps: ({ search: { name, page } }) => ({ name, page }),
	loader: async ({ context: { queryClient }, deps: { name, page } }) => {
		await Promise.all([
			queryClient.ensureQueryData(userQueries.list({ name, page })),
			queryClient.ensureQueryData(userQueries.currentUser()),
		]);
		return { crumb: m.settings_members_title() };
	},
	head: () => ({
		meta: [{ title: m.settings_members_title() }],
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
				<h1 className="text-2xl font-bold">{m.settings_members_title()}</h1>
				<p className="text-sm text-muted-foreground">
					{m.settings_members_description()}
				</p>
			</div>
			<Suspense fallback={<UserListSkeleton />}>
				<UserList
					queries={queries}
					toolbarStart={
						<UserListSearchbar
							searchValue={getFilterValue(name ?? "")}
							onChange={setSearchValue}
						/>
					}
				/>
			</Suspense>
		</div>
	);
}
