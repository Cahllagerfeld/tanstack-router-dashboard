import redaxios from "redaxios";
export const apiPaths = {
	login: "/login",
	info: "/info",
	activate: "/activate",
	settings: "/settings",
};

export const axios = redaxios.create({
	baseURL: "/api/v1",
	withCredentials: true,
	headers: {
		"Source-Context": "dashboard-v2",
	},
});
