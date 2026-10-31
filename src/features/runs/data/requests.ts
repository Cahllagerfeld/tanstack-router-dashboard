import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";

import type { ProjectRunListInput, RunPage } from "../model";
import { runFromApi } from "./map";

export async function fetchRunList(
	params: ProjectRunListInput
): Promise<RunPage> {
	const response = await apiClient.GET("/api/v1/runs", {
		params: {
			query: params,
		},
	});
	const data = expectData(response);

	return {
		...data,
		items: data.items.map(runFromApi),
	};
}
