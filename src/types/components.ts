import { components, operations } from "./core";

export type Component = components["schemas"]["ComponentResponse"];
export type ComponentsList = components["schemas"]["Page_ComponentResponse_"];
export type ComponentsListQueryParams =
	operations["list_stack_components_api_v1_components_get"]["parameters"]["query"];

export type ComponentType = components["schemas"]["StackComponentType"];
