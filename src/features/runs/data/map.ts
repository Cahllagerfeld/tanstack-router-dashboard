import { parseBackendDate } from "@/shared/lib/dates";

import type { Run } from "../model";
import type { RunDto } from "./dto";

export function runFromApi(apiRun: RunDto): Run {
	return {
		id: apiRun.id,
		index: apiRun.body?.index,
		status: apiRun.body?.status,
		pipelineName: apiRun.resources?.pipeline?.name ?? undefined,
		stackName: apiRun.resources?.stack?.name ?? undefined,
		authorName: apiRun.resources?.user?.name ?? undefined,
		created: apiRun.body?.created
			? parseBackendDate(apiRun.body.created)
			: undefined,
	};
}
