import { parseBackendDate } from "@/shared/lib/dates";

import type { Pipeline } from "../model";
import type { PipelineDto } from "./dto";

export function pipelineFromApi(apiPipeline: PipelineDto): Pipeline {
	return {
		id: apiPipeline.id,
		name: apiPipeline.name,
		description: apiPipeline.metadata?.description ?? undefined,
		created: apiPipeline.body?.created
			? parseBackendDate(apiPipeline.body.created)
			: undefined,
	};
}
