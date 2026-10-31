import createClient, { type Middleware } from "openapi-fetch";

import { m } from "@/paraglide/messages";
import { FetchError, throwFetchErrorFromResponse } from "@/shared/api/errors";
import type { paths } from "@/shared/api/generated";

const defaultHeaders = {
	"Content-Type": "application/json",
	"Source-Context": "kitaru-ui",
};

/** The query a GET endpoint accepts, read from the API spec. */
export type ApiQuery<Path extends keyof paths> = paths[Path] extends {
	get: { parameters: { query?: infer Query } };
}
	? NonNullable<Query>
	: never;

/** The JSON body an endpoint accepts, read from the API spec. */
export type ApiBody<
	Path extends keyof paths,
	Method extends keyof paths[Path],
> = paths[Path][Method] extends {
	requestBody: { content: { "application/json": infer Body } };
}
	? Body
	: never;

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
