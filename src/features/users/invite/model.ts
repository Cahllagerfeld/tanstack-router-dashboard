type InviteLinkInput = {
	origin: string;
	userId: string;
	token: string;
};

export function buildInviteLink({ origin, userId, token }: InviteLinkInput) {
	const search = new URLSearchParams({ user: userId, token });
	return `${origin}/activate-user?${search.toString()}`;
}
