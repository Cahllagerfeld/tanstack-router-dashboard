import { FetchError } from "@/lib/fetch-error";

const headers = {
	"Content-Type": "application/json",
	"Source-Context": "dashboard-v2",
};

export async function apiClient<T>(
	endpoint: RequestInfo | URL,
	init?: RequestInit
) {
	const url = `/api/v1${endpoint}`;
	const config: RequestInit = {
		credentials: "include",
		...init,
		headers: {
			...headers,
			...init?.headers,
		},
	};

	const res = await fetch(url, config);
	if (!res.ok) {
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: "An error occurred while fetching data",
		});
	}

	const data: T = await res.json();
	return data;
}
