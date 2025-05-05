import { queryOptions } from "@tanstack/react-query";
import { fetchServerInfo } from "./info";
import { fetchServerSettings } from "./settings";

export const serverQueries = {
	infoKey: ["info"] as const,
	settingsKey: ["settings"] as const,
	serverInfo: () =>
		queryOptions({
			queryKey: serverQueries.infoKey,
			queryFn: fetchServerInfo,
		}),
	serverSettings: () =>
		queryOptions({
			queryKey: serverQueries.settingsKey,
			queryFn: fetchServerSettings,
		}),
};
