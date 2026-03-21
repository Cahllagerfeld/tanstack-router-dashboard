import { expectData } from "@/lib/fetch-error";
import { StacksListQueryParams } from "@/types/stacks";
import { apiClient } from "../api-client";

export async function fetchStackList(params: StacksListQueryParams) {
	const response = await apiClient.GET("/api/v1/stacks", {
		params: {
			query: params,
		},
	});
	return expectData(response);
}
