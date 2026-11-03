import { queryOptions } from "@tanstack/react-query";

import { fetchServerSettings } from "./requests";

export const serverSettingsKeys = {
	all: ["server-settings"] as const,
};

export const serverSettingsQueries = {
	detail: () =>
		queryOptions({
			queryKey: serverSettingsKeys.all,
			queryFn: fetchServerSettings,
		}),
};
