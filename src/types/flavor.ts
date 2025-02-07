import { components, operations } from "./core";

export type Flavor = components["schemas"]["FlavorResponse"];

export type FlavorList = components["schemas"]["Page_FlavorResponse_"];
export type FlavorListQueryParams = NonNullable<
	operations["list_flavors_api_v1_flavors_get"]["parameters"]["query"]
>;
