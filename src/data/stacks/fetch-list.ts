import { expectData } from "@/lib/fetch-error";
import { StacksListQueryParams } from "@/types/stacks";
import { apiClient } from "../api-client";
import { stackFromApi } from "@/domain/stacks";

export async function fetchStackList(params: StacksListQueryParams) {
	const response = await apiClient.GET("/api/v1/stacks", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(stackFromApi),
	};
}
