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
	components: {
		base: "/components",
		detail: (id: string) => `/components/${id}`,
	},
	users: {
		base: "/users",
		currentUser: "/current-user",
	},
} as const;
