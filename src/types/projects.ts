import { components, operations } from "./core";

export type ProjectList = components["schemas"]["Page_ProjectResponse_"];
export type Project = components["schemas"]["ProjectResponse"];
export type CreateProject = components["schemas"]["ProjectRequest"];

export type ProjectListQueries = NonNullable<
	operations["list_projects_api_v1_projects_get"]["parameters"]["query"]
>;
