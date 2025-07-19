import { components, operations } from "./core";

export type ServiceAccountList =
	components["schemas"]["Page_ServiceAccountResponse_"];

export type ServiceAccountListQueries = NonNullable<
	operations["list_service_accounts_api_v1_service_accounts_get"]["parameters"]["query"]
>;

export type ServiceAccount = components["schemas"]["ServiceAccountResponse"];
