import redaxios from "redaxios";
export const apiPaths = {
	info: "/info",
	settings: "/settings",
};

export const axios = redaxios.create({
	baseURL: "/api/v1",
	withCredentials: true,
	headers: {
		"Source-Context": "dashboard-v2",
	},
});
