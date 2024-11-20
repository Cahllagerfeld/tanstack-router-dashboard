import { components } from "./core";

export type Login = {
	username: string;
	password: string;
};

export type LoginTokenResponse = components["schemas"]["OAuthTokenResponse"];
