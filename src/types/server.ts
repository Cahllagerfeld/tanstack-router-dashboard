import type { components } from "@/shared/api/generated";

export type ServerActivation = components["schemas"]["ServerActivationRequest"];

export type ApiServerActivationResult =
	| components["schemas"]["UserResponse"]
	| null;
