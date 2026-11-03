import { apiClient } from "@/shared/api/client";
import { expectData, expectOptionalData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { DeleteRunInput, ProjectRunListInput } from "../model";
import { runFromApi } from "./map";

export async function fetchRunList(params: ProjectRunListInput) {
	const response = await apiClient.GET("/api/v1/runs", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), runFromApi);
}

export async function deleteRun({ runId }: DeleteRunInput) {
	const response = await apiClient.DELETE("/api/v1/runs/{run_id}", {
		params: { path: { run_id: runId } },
	});
	expectOptionalData(response);
}
