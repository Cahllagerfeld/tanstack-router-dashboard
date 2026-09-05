export function parseBackendDate(dateString: string) {
	if (!dateString.endsWith("Z")) {
		return new Date(`${dateString}Z`);
	}
	return new Date(dateString);
}
