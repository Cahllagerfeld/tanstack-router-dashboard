import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { ProjectRunListInput } from "../model";
import { runFromApi } from "./map";

export async function fetchRunList(params: ProjectRunListInput) {
	const response = await apiClient.GET("/api/v1/runs", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), runFromApi);
}
