import { components, operations } from "./core";

export type User = components["schemas"]["UserResponse"];

export type UserList = components["schemas"]["Page_UserResponse_"];
export type UserListQueryParams =
	operations["list_users_api_v1_users_get"]["parameters"]["query"];
