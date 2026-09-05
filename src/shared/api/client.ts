import createClient, { type Middleware } from "openapi-fetch";

import { m } from "@/paraglide/messages";
import { FetchError, throwFetchErrorFromResponse } from "@/shared/api/errors";
import type { paths } from "@/shared/api/generated";

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
			message: m.common_error_request_failed(),
		});
	},
};

apiClient.use(errorHandlingMiddleware);
