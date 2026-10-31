import type { ApiQuery } from "@/shared/api/client";

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
