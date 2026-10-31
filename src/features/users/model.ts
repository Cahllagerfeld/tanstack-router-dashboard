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

/** Mirrors the backend's list query, so its field names stay as they are. */
export type UserListInput = {
	hydrate?: boolean;
	sort_by?: string;
	logical_operator?: "and" | "or";
	page?: number;
	size?: number;
	id?: string | string[] | null;
	created?: string | string[] | null;
	updated?: string | string[] | null;
	name?: string | string[] | null;
	full_name?: string | string[] | null;
	email?: string | string[] | null;
	active?: boolean | string | null;
	email_opted_in?: boolean | string | null;
	external_user_id?: string | string[] | null;
};

export type UserPage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: User[];
};
