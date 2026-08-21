import { parseBackendDate } from "@/lib/dates";
import { components } from "@/types/core";

export type User = {
	id: string;
	name: string;
	resolvedName: string;
	fullName: string | undefined;
	isAdmin: boolean | undefined;
	isActive: boolean | undefined;
	created: Date | undefined;
	email: string | undefined;
};

export function userFromApi(
	apiUser: components["schemas"]["UserResponse"]
): User {
	return {
		id: apiUser.id,
		name: apiUser.name,
		resolvedName: apiUser.body?.full_name || apiUser.name,
		fullName: apiUser.body?.full_name ?? undefined,
		isAdmin: apiUser.body?.is_admin ?? undefined,
		isActive: apiUser.body?.active ?? undefined,
		created: apiUser.body?.created
			? parseBackendDate(apiUser.body.created)
			: undefined,
		email: apiUser.metadata?.email ?? undefined,
	};
}
