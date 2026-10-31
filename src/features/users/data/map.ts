import { parseBackendDate } from "@/shared/lib/dates";

import type { InvitedUser, User } from "../model";
import type { UserDto } from "./dto";

export function userFromApi(apiUser: UserDto): User {
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

export function invitedUserFromApi(apiUser: UserDto): InvitedUser {
	return {
		user: userFromApi(apiUser),
		activationToken: apiUser.body?.activation_token ?? undefined,
	};
}
