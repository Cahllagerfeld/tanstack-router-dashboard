import { components } from "@/types/core";

export type Pipeline = {
	id: string;
	name: string;
};

export function pipelineFromApi(
	apiPipeline: components["schemas"]["PipelineResponse"]
): Pipeline {
	return {
		id: apiPipeline.id,
		name: apiPipeline.name,
	};
}
