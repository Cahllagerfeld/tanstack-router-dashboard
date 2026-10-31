import type { ApiQuery } from "@/shared/api/client";

export type Stack = {
	id: string;
	name: string;
	creatorName: string | undefined;
	created: Date | undefined;
};

export type StackListInput = ApiQuery<"/api/v1/stacks">;

export type StackPage = {
	index: number;
	max_size: number;
	total: number;
	total_pages: number;
	items: Stack[];
};
