import { operations } from "./core";

export type UserListQueryParams = NonNullable<
	operations["list_users_api_v1_users_get"]["parameters"]["query"]
>;
