import { type operations } from "@/shared/api/generated";

export type PipelineListQueryParams = NonNullable<
	operations["list_pipelines_api_v1_pipelines_get"]["parameters"]["query"]
>;
