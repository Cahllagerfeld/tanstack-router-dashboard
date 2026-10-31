import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { PipelineListInput } from "../model";
import { pipelineFromApi } from "./map";

export async function fetchPipelineList(params: PipelineListInput) {
	const response = await apiClient.GET("/api/v1/pipelines", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), pipelineFromApi);
}
