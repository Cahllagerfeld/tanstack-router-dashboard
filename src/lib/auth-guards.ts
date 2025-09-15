import { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { userQueries } from "@/data/user";
import { isFetchError } from "@/lib/fetch-error";

export async function requireAuth(queryClient: QueryClient) {
	const state = queryClient.getQueryState(userQueries.currentUser().queryKey);
	if (state?.status === "success") return;

	try {
		await queryClient.ensureQueryData(userQueries.currentUser());
	} catch (e) {
		if (isFetchError(e) && e.status === 401) {
			throw redirect({ to: "/login" });
		}
		throw e;
	}
}

export async function redirectIfAuthenticated(
	queryClient: QueryClient,
	to: string
) {
	try {
		await queryClient.ensureQueryData(userQueries.currentUser());
		throw redirect({ to });
	} catch (e) {
		if (isFetchError(e) && e.status === 401) {
			return;
		}
		throw e;
	}
}
