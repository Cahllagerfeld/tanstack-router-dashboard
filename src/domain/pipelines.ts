import { parseBackendDate } from "@/lib/dates";
import { type components } from "@/types/core";

export type Pipeline = {
	id: string;
	name: string;
	description?: string;
	created: Date | undefined;
};

export function pipelineFromApi(
	apiPipeline: components["schemas"]["PipelineResponse"]
): Pipeline {
	return {
		id: apiPipeline.id,
		name: apiPipeline.name,
		description: apiPipeline.metadata?.description ?? undefined,
		created: apiPipeline.body?.created
			? parseBackendDate(apiPipeline.body.created)
			: undefined,
	};
}
