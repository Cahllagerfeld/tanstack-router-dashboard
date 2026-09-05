import { parseBackendDate } from "@/lib/dates";
import { snakeCaseToTitleCase } from "@/lib/strings";
import type { components } from "@/types/core";

export type Run = {
	id: string;
	index: number | undefined;
	status: string | undefined;
	pipelineName: string | undefined;
	stackName: string | undefined;
	authorName: string | undefined;
	created: Date | undefined;
};

export function runFromApi(
	apiRun: components["schemas"]["PipelineRunResponse"]
): Run {
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

export function formatRunIndex(index: number): string {
	return `#${String(index).padStart(4, "0")}`;
}

export function formatRunStatus(status: string): string {
	return snakeCaseToTitleCase(status);
}
