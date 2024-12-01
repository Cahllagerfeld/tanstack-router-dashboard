export function buildQueryString(params: Record<string, any>): string {
	const searchParams = new URLSearchParams();
	Object.keys(params).forEach((key) => {
		const value = params[key];
		if (value !== null && value !== undefined) {
			searchParams.append(key, String(value));
		}
	});
	return searchParams.toString();
}
