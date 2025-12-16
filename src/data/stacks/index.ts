import { createResourceQueries } from "../query-factory";
import { apiPaths } from "../api";
import { Stack, StacksList, StacksListQueryParams } from "@/types/stacks";

export const stackQueries = createResourceQueries<
	StacksList,
	Stack,
	StacksListQueryParams
>({
	baseKey: "stacks",
	endpoints: {
		base: apiPaths.stacks.base,
		detail: apiPaths.stacks.detail,
	},
	defaultListParams: {
		sort_by: "desc:created",
	},
});
