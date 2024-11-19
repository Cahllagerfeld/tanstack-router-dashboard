import { queryOptions } from "@tanstack/react-query";
import { fetchServerInfo } from "./info";

export const serverQueries = {
	serverInfo: () =>
		queryOptions({
			queryKey: ["info"],
			queryFn: fetchServerInfo,
		}),
};
