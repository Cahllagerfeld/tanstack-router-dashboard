import { parseBackendDate } from "@/lib/dates";
import { components } from "@/types/core";

const MASKED_VALUE = "••••••";

export type Secret = {
	id: string;
	name: string;
	permissionDenied: boolean;
	keyCount: number;
	created: Date | undefined;
	isPrivate: boolean | undefined;
};

export function secretFromApi(
	apiSecret: components["schemas"]["SecretResponse"]
): Secret {
	const values = apiSecret.body?.values;
	const keyCount = values ? Object.keys(values).length : 0;

	return {
		id: apiSecret.id,
		name: apiSecret.name,
		permissionDenied: apiSecret.permission_denied,
		keyCount,
		created: apiSecret.body?.created
			? parseBackendDate(apiSecret.body.created)
			: undefined,
		isPrivate: apiSecret.body?.private,
	};
}

/**
 * Returns the same keys as `values` with each value replaced by a fixed mask string.
 */
export function maskSecretValues(
	values: Record<string, unknown> | undefined | null
): Record<string, string> {
	if (!values) {
		return {};
	}
	return Object.fromEntries(
		Object.keys(values).map((key) => [key, MASKED_VALUE])
	);
}
