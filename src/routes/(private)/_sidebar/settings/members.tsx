import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { z } from "zod";

import { sessionQueries } from "@/features/session";
import { type UserListInput, userQueries } from "@/features/users";
import {
	UserListSearchbar,
	UserList,
	UserListSkeleton,
} from "@/features/users/ui";
import { m } from "@/paraglide/messages";
import {
	createFilter,
	filterSchema,
	getFilterValue,
} from "@/shared/filters/filter";

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
			queryClient.ensureQueryData(sessionQueries.currentIdentity()),
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
	const queries: UserListInput = {
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
		<Suspense fallback={<UserListSkeleton />}>
			<UserList
				queries={queries}
				onClearSearch={() => setSearchValue("")}
				toolbarStart={
					<UserListSearchbar
						searchValue={getFilterValue(name ?? "")}
						onChange={setSearchValue}
					/>
				}
			/>
		</Suspense>
	);
}
