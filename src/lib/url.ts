import { buildQueryString } from "./querystring";

export function buildUrlWithQueries(
	url: string,
	queries: Record<string, unknown>
) {
	const queryString = buildQueryString(queries).toString();
	return url + (queryString ? `?${queryString}` : "");
}
