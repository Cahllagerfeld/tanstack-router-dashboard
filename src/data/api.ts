export const apiPaths = {
	login: "/login",
	logout: "/logout",
	info: "/info",
	activate: "/activate",
	settings: "/settings",
	workspaces: {
		base: "/workspaces",
		detail: (id: string) => `/workspaces/${id}`,
	},
	users: {
		currentUser: "/current-user",
	},
} as const;
