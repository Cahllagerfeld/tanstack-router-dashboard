import type { ApiBody } from "@/shared/api/client";

/** Who is signed in. The administrative `User` belongs to the Users feature. */
export type CurrentIdentity = {
	id: string;
	/** The unique account name the user signs in with. */
	name: string;
	fullName: string | undefined;
	resolvedName: string;
	email: string | undefined;
	isAdmin: boolean | undefined;
};

export type LoginInput = {
	username: string;
	password: string;
};

type UpdateCurrentUserBody = ApiBody<"/api/v1/current-user", "put">;

/** Changes to the signed-in account's own profile. Omitted fields stay as they are. */
export type UpdateProfileInput = Pick<
	UpdateCurrentUserBody,
	"name" | "full_name" | "email"
>;

/** The server rejects a new password unless the current one is correct. */
export type ChangePasswordInput = {
	old_password: string;
	password: string;
};
