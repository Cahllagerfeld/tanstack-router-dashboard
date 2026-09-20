import type { operations } from "@/shared/api/generated";

export type RunListQueryParams = NonNullable<
	operations["list_runs_api_v1_runs_get"]["parameters"]["query"]
>;

export type ProjectRunListQueryParams = RunListQueryParams & {
	project: string;
};
