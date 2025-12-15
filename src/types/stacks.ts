import { components, operations } from "./core";

export type Stack = components["schemas"]["StackResponse"];
export type StacksList = components["schemas"]["Page_StackResponse_"];
export type StacksListQueryParams = NonNullable<
	operations["list_stacks_api_v1_stacks_get"]["parameters"]["query"]
>;
