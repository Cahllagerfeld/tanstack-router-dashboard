import { apiClient } from "../api-client";
import { stackFromApi } from "@/domain/stacks";
import { expectData } from "@/lib/fetch-error";

export async function fetchStackDetail(stackId: string) {
	const response = await apiClient.GET("/api/v1/stacks/{stack_id}", {
		params: {
			path: {
				stack_id: stackId,
			},
		},
	});
	return stackFromApi(expectData(response));
}
