import type { operations } from "@/shared/api/generated";

export type StacksListQueryParams = NonNullable<
	operations["list_stacks_api_v1_stacks_get"]["parameters"]["query"]
>;
