import { queryOptions } from "@tanstack/react-query";
import { fetchServerInfo } from "./info";

const baseKey = "server" as const;

export const serverKeys = {
	all: [baseKey] as const,
	info: () => [...serverKeys.all, "info"] as const,
};

export const serverQueries = {
	infoKey: serverKeys.info(),
	serverInfo: () =>
		queryOptions({
			queryKey: serverKeys.info(),
			queryFn: fetchServerInfo,
		}),
};
