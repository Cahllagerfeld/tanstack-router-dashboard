export const apiPaths = {
	login: "/login",
	logout: "/logout",
	info: "/info",
	activate: "/activate",
	settings: "/settings",
	projects: {
		base: "/projects",
		detail: (id: string) => `/projects/${id}`,
	},
	stacks: {
		base: "/stacks",
	},
	components: {
		base: "/components",
	},
	users: {
		base: "/users",
		currentUser: "/current-user",
	},
} as const;
