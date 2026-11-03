import type { CurrentIdentity, UpdateProfileInput } from "../model";
import type { ProfileFormValues } from "./schema";

export function profileFormValues(
	identity: CurrentIdentity
): ProfileFormValues {
	return {
		fullName: identity.fullName ?? "",
		username: identity.name,
		email: identity.email ?? "",
	};
}

/**
 * Only the fields the user changed from the values the form started with, so
 * an untouched username is never resubmitted, even if the signed-in identity
 * refreshed meanwhile. A cleared email is removed, not set to "".
 */
export function profileChanges(
	saved: ProfileFormValues,
	values: ProfileFormValues
): UpdateProfileInput {
	const changes: UpdateProfileInput = {};
	if (values.fullName !== saved.fullName) changes.full_name = values.fullName;
	if (values.username !== saved.username) changes.name = values.username;
	if (values.email !== saved.email) changes.email = values.email || null;
	return changes;
}
