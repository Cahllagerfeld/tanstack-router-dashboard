import { createFilter, getFilterValue } from "@/features/filters/filter";
import { UserListSearchbar } from "@/features/users/list/searchbar";
import { UserList } from "@/features/users/list/user-list";
import { UserListSkeleton } from "@/features/users/list/user-list-skeleton";
import { UserListQueryParams } from "@/types/user";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createLazyFileRoute(
	"/(private)/_unscoped/settings/members"
)({
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
				<p className="text-sm text-muted-foreground">
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
