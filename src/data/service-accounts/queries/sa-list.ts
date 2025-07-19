import { buildUrlWithQueries } from "@/lib/url";
import {
	ServiceAccountList,
	ServiceAccountListQueries,
} from "@/types/service-accounts";
import { apiPaths } from "../../api";
import { apiClient } from "../../api-client";

type Args = {
	queries: ServiceAccountListQueries;
};

export async function fetchServiceAccountList({ queries }: Args) {
	const url = buildUrlWithQueries(apiPaths.serviceAccounts.base, queries);

	console.log(url);
	const data = await apiClient<ServiceAccountList>(url);
	return data;
}
