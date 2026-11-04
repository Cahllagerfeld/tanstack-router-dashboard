import { apiClient } from "@/shared/api/client";
import { expectData } from "@/shared/api/errors";
import { mapPage } from "@/shared/lib/page";

import type { SnapshotListInput } from "../model";
import { snapshotFromApi } from "./map";

export async function fetchSnapshotList(params: SnapshotListInput) {
	const response = await apiClient.GET("/api/v1/pipeline_snapshots", {
		params: {
			query: params,
		},
	});
	return mapPage(expectData(response), snapshotFromApi);
}
