import { FetchError, throwFetchErrorFromResponse } from "@/lib/fetch-error";
import { paths } from "@/types/core";
import createClient, { type Middleware } from "openapi-fetch";

const defaultHeaders = {
	"Content-Type": "application/json",
	"Source-Context": "kitaru-ui",
};

export const apiClient = createClient<paths>({
	credentials: "include",
	headers: defaultHeaders,
});

const errorHandlingMiddleware: Middleware = {
	async onResponse({ response }) {
		if (!response.ok) {
			await throwFetchErrorFromResponse({
				response,
			});
		}

		return response;
	},
	onError() {
		return new FetchError({
			status: 0,
			statusText: "REQUEST_FAILED",
			message: "Request failed before receiving a response",
		});
	},
};

apiClient.use(errorHandlingMiddleware);
