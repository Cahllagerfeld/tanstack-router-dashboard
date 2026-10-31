import type { CurrentIdentity } from "../model";
import type { CurrentIdentityDto } from "./dto";

export function currentIdentityFromApi(
	identity: CurrentIdentityDto
): CurrentIdentity {
	return {
		id: identity.id,
		resolvedName: identity.body?.full_name || identity.name,
		email: identity.metadata?.email ?? undefined,
		isAdmin: identity.body?.is_admin ?? undefined,
	};
}
