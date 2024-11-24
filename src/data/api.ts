export const apiPaths = {
	login: "/login",
	info: "/info",
	activate: "/activate",
	settings: "/settings",
	workspaces: {
		base: "/workspaces",
		detail: (id: string) => `/workspaces/${id}`,
	},
} as const;
