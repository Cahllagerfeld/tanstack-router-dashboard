import { components } from "./core";

export type ServerInfo = components["schemas"]["ServerModel"];
export type ServerActivation = components["schemas"]["ServerActivationRequest"];

export type ApiServerActivationResult =
	| components["schemas"]["UserResponse"]
	| null;
