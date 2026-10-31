/** Who is signed in. The administrative `User` belongs to the Users feature. */
export type CurrentIdentity = {
	id: string;
	resolvedName: string;
	email: string | undefined;
	isAdmin: boolean | undefined;
};

export type LoginInput = {
	username: string;
	password: string;
};
