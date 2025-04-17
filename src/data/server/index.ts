import { queryOptions } from "@tanstack/react-query";
import { fetchServerInfo } from "./info";

export const serverQueries = {
	infoKey: ["info"] as const,
	serverInfo: () =>
		queryOptions({
			queryKey: serverQueries.infoKey,
			queryFn: fetchServerInfo,
		}),
};
