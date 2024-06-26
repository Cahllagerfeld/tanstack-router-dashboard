import { queryOptions } from "@tanstack/react-query";
import { fetchServerInfo } from "./server-info";

export const serverQueries = {
	serverInfo: () =>
		queryOptions({
			queryKey: ["info"],
			queryFn: async () => fetchServerInfo()
		})
};
