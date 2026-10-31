import type { ApiBody, ApiQuery } from "@/shared/api/client";

/** The administrative account. Session owns who is signed in. */
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

export type UserListInput = ApiQuery<"/api/v1/users">;

export type InviteUserInput = Pick<
	ApiBody<"/api/v1/users", "post">,
	"name" | "is_admin"
>;

/** The server returns the activation token only when the user is created. */
export type InvitedUser = {
	user: User;
	activationToken: string | undefined;
};

export type ActivateUserInput = {
	userId: string;
	body: Pick<
		ApiBody<"/api/v1/users/{user_name_or_id}/activate", "put">,
		"activation_token" | "password" | "full_name"
	>;
};
