import { queryOptions } from "@tanstack/react-query";
import { SecretsListQueryParams } from "@/types/secrets";
import { fetchSecretDetail } from "./fetch-detail";
import { fetchSecretList } from "./fetch-list";

const baseKey = "secrets" as const;

export const secretQueries = {
	baseKey: [baseKey] as const,
	list: (params?: SecretsListQueryParams) => {
		const mergedParams = {
			sort_by: "desc:created",
			size: 10,
			page: 1,
			...params,
		} satisfies SecretsListQueryParams;

		return queryOptions({
			queryKey: [baseKey, mergedParams] as const,
			queryFn: () => fetchSecretList(mergedParams),
		});
	},
	detail: (secretId: string) =>
		queryOptions({
			queryKey: [baseKey, secretId] as const,
			queryFn: () => fetchSecretDetail(secretId),
		}),
};
