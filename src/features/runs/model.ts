import type { ApiQuery } from "@/shared/api/client";
import { snakeCaseToTitleCase } from "@/shared/lib/strings";

export type Run = {
	id: string;
	index: number | undefined;
	status: string | undefined;
	pipelineName: string | undefined;
	stackName: string | undefined;
	authorName: string | undefined;
	created: Date | undefined;
};

/** A Project scopes Run access, so `project` is required. */
export type ProjectRunListInput = ApiQuery<"/api/v1/runs"> & {
	project: string;
};

export type RunPage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Run[];
};

export function formatRunIndex(index: number): string {
	return `#${String(index).padStart(4, "0")}`;
}

export function formatRunStatus(status: string): string {
	return snakeCaseToTitleCase(status);
}
