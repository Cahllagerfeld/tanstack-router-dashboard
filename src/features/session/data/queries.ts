import { type QueryClient, queryOptions } from "@tanstack/react-query";

import { fetchCurrentIdentity } from "./requests";

export const sessionKeys = {
	/** The value predates Session, and every caller shares this cache entry. */
	currentIdentity: () => ["users", "current"] as const,
};

export const sessionQueries = {
	currentIdentity: () =>
		queryOptions({
			queryKey: sessionKeys.currentIdentity(),
			queryFn: fetchCurrentIdentity,
		}),
};

/** Authenticated route guard: a failed request rejects and stops navigation. */
export function ensureCurrentIdentity(queryClient: QueryClient) {
	return queryClient.ensureQueryData(sessionQueries.currentIdentity());
}
