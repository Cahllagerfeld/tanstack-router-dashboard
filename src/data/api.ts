export const apiPaths = {
	login: "/login",
	logout: "/logout",
	info: "/info",
	activate: "/activate",
	settings: "/settings",
	flavors: {
		base: "/flavors",
		detail: (id: string) => `/flavors/${id}`,
	},
	workspaces: {
		base: "/workspaces",
		detail: (id: string) => `/workspaces/${id}`,
		components: (id: string) => `/workspaces/${id}/components`,
	},
	users: {
		currentUser: "/current-user",
	},
} as const;
