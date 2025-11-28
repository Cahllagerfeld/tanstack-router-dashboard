import { apiPaths } from "@/data/api";
import { apiClient } from "@/data/api-client";
import { buildQueryString } from "@/lib/querystring";
import { StackList, StackListQueryParams } from "@/types/stacks";

export async function fetchStacks(options?: StackListQueryParams) {
	const defaultQueries: StackListQueryParams = {
		sort_by: "desc:created",
	};
	const data = await apiClient<StackList>(
		apiPaths.stacks.base +
			(options ? `?${buildQueryString({ ...defaultQueries, ...options })}` : "")
	);

	return data;
}
