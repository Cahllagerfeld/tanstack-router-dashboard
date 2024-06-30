import { LoginFormType } from "~/types/session";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetcher";
import { FetchError } from "../../lib/fetch-error";

export async function loginUser(body: LoginFormType) {
	const url = createApiPath(apiPaths.login);

	const res = await fetcher(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams(body)
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

	return res.json();
}
