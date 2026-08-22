import type { components } from "./core";

export type ServerActivation = components["schemas"]["ServerActivationRequest"];

export type ApiServerActivationResult =
	components["schemas"]["UserResponse"] | null;
