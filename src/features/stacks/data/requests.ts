import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

import type { StackListInput, StackPage } from "../model";
import { stackFromApi } from "./map";

export async function fetchStackList(
	params: StackListInput
): Promise<StackPage> {
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
