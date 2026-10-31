import type { ApiQuery } from "@/shared/api/client";

export type Pipeline = {
	id: string;
	name: string;
	description?: string;
	created: Date | undefined;
};

/** A Project scopes Pipeline access, so `project` is required. */
export type PipelineListInput = ApiQuery<"/api/v1/pipelines"> & {
	project: string;
};

export type PipelinePage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Pipeline[];
};
