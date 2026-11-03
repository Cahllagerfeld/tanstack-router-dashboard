import { apiClient } from "@/shared/api/client";
import { expectData, expectOptionalData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { DeletePipelineInput, PipelineListInput } from "../model";
import { pipelineFromApi } from "./map";

export async function fetchPipelineList(params: PipelineListInput) {
	const response = await apiClient.GET("/api/v1/pipelines", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), pipelineFromApi);
}

export async function deletePipeline({ pipelineId }: DeletePipelineInput) {
	const response = await apiClient.DELETE("/api/v1/pipelines/{pipeline_id}", {
		params: { path: { pipeline_id: pipelineId } },
	});
	expectOptionalData(response);
}
