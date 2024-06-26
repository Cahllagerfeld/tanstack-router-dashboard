import { FetchError } from "~/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetcher";

export async function fetchServerInfo() {
	const url = createApiPath(apiPaths.info);
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching server info",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}
