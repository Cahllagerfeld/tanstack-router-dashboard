import { components, operations } from "./core";

export type Stack = components["schemas"]["StackResponse"];
export type StackList = components["schemas"]["Page_StackResponse_"];
export type StackListQueryParams =
	operations["list_stacks_api_v1_stacks_get"]["parameters"]["query"];
