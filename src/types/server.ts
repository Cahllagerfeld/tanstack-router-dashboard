import { components } from "./core";

export type ServerInfo = components["schemas"]["ServerModel"];
export type ServerActivation = components["schemas"]["ServerActivationRequest"];

export type ServerSettings = components["schemas"]["ServerSettingsResponse"];
export type ServerSettingsUpdate =
	components["schemas"]["ServerSettingsUpdate"];
