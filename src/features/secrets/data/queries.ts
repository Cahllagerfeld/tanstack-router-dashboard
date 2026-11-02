import { queryOptions } from "@tanstack/react-query";

import type { SecretListInput } from "../model";
import { fetchSecretList } from "./requests";

const baseKey = "secrets" as const;

export const secretKeys = {
	all: [baseKey] as const,
	lists: () => [...secretKeys.all, "list"] as const,
	list: (params: SecretListInput) => [...secretKeys.lists(), params] as const,
};

export const secretQueries = {
	baseKey: secretKeys.all,
	list: (params?: SecretListInput) => {
		const mergedParams = {
			sort_by: "desc:created",
			...params,
		} satisfies SecretListInput;

		return queryOptions({
			queryKey: secretKeys.list(mergedParams),
			queryFn: () => fetchSecretList(mergedParams),
		});
	},
};
