import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { StackListInput } from "../model";
import { stackFromApi } from "./map";

export async function fetchStackList(params: StackListInput) {
	const response = await apiClient.GET("/api/v1/stacks", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), stackFromApi);
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
