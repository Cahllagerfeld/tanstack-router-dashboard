import { parseBackendDate } from "@/shared/lib/dates";

import type { Snapshot } from "../model";
import type { SnapshotDto } from "./dto";

export function snapshotFromApi(apiSnapshot: SnapshotDto): Snapshot {
	return {
		id: apiSnapshot.id,
		name: apiSnapshot.name || apiSnapshot.id,
		pipelineName: apiSnapshot.resources?.pipeline?.name || undefined,
		stackName: apiSnapshot.resources?.stack?.name || undefined,
		authorName: apiSnapshot.resources?.user?.name || undefined,
		created: apiSnapshot.body?.created
			? parseBackendDate(apiSnapshot.body.created)
			: undefined,
	};
}
