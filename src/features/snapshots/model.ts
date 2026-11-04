import type { ApiQuery } from "@/shared/api/client";

export type Snapshot = {
	id: string;
	/** The snapshot name, or its id when the snapshot is unnamed. */
	name: string;
	pipelineName: string | undefined;
	stackName: string | undefined;
	authorName: string | undefined;
	created: Date | undefined;
};

/** A Project scopes Snapshot access, so `project` is required. */
export type SnapshotListInput = ApiQuery<"/api/v1/pipeline_snapshots"> & {
	project: string;
};
