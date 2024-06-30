import { ServerActivationPayload } from "~/types/server";
import { FetchError } from "../../lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetcher";
import { User } from "~/types/user";

export async function updateServerSettings(body: ServerActivationPayload) {
	const url = createApiPath(apiPaths.activate);

	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => "Failed to activate server");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	const data: User = await res.json();
	return data;
}
