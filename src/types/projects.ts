import { components, operations } from "./core";

export type ProjectList = components["schemas"]["Page_ProjectResponse_"];
export type Project = components["schemas"]["ProjectResponse"];
export type CreateProject = components["schemas"]["ProjectRequest"];

export type ProjectListQueries = NonNullable<
	operations["get_project_api_v1_projects__project_name_or_id__get"]["parameters"]["query"]
>;
