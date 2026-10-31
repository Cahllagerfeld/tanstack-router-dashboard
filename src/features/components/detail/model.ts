/** Turns backend labels into header tags. Valueless labels show their key alone. */
export function getLabelTags(labels: Record<string, unknown> | undefined) {
	return Object.entries(labels ?? {}).map(([key, value]) => {
		if (value === null || value === "") return key;
		const text = typeof value === "string" ? value : JSON.stringify(value);
		return `${key}: ${text}`;
	});
}
