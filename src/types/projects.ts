import { components, operations } from "./core";

export type ProjectListQueries = NonNullable<
	operations["list_projects_api_v1_projects_get"]["parameters"]["query"]
>;

export type ApiCreateProject = components["schemas"]["ProjectRequest"];
