import { isFetchError } from "./fetch-error";
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			if (isFetchError(error)) {
				if (error.status === 401) {
					if (window.location.pathname !== "/login") {
						window.location.assign("/login");
					}
				}
			}
		},
	}),
});
