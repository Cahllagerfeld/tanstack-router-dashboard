/** Mirrors the backend's activation request, so its field names stay as they are. */
export type ServerActivationInput = {
	server_name?: string | null;
	logo_url?: string | null;
	enable_analytics?: boolean | null;
	display_announcements?: boolean | null;
	display_updates?: boolean | null;
	admin_username?: string | null;
	admin_password?: string | null;
};
