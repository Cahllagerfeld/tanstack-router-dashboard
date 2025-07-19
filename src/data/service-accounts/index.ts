import { queryOptions } from "@tanstack/react-query";
import { fetchServiceAccountList } from "./queries/sa-list";
import { ServiceAccountListQueries } from "@/types/service-accounts";

export const serviceAccountQueries = {
	baseKey: "service-accounts" as const,
	list: (queries: ServiceAccountListQueries = {}) => {
		const defaultQueries: ServiceAccountListQueries = {
			sort_by: "desc:created",
		};
		const finalQueries = { ...defaultQueries, ...queries };
		return queryOptions({
			queryKey: [serviceAccountQueries.baseKey, finalQueries],
			queryFn: () => fetchServiceAccountList({ queries: finalQueries }),
		});
	},
};
