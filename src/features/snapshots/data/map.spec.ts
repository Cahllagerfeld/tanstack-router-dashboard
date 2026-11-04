import { describe, expect, it } from "vitest";

import type { SnapshotDto } from "./dto";
import { snapshotFromApi } from "./map";

describe("snapshotFromApi", () => {
	it("maps the embedded Pipeline, Stack, and author to their names", () => {
		const apiSnapshot = {
			id: "snapshot-id",
			name: "nightly",
			permission_denied: false,
			body: {
				created: "2026-08-22T10:00:00",
				updated: "2026-08-22T10:00:00",
				project_id: "project-id",
				runnable: true,
				deployable: false,
				is_dynamic: false,
			},
			resources: {
				pipeline: {
					id: "pipeline-id",
					name: "training-pipeline",
					permission_denied: false,
				},
				stack: { id: "stack-id", name: "default", permission_denied: false },
				user: { id: "user-id", name: "alice", permission_denied: false },
				tags: [],
				visualizations: [],
			},
		} satisfies SnapshotDto;

		expect(snapshotFromApi(apiSnapshot)).toEqual({
			id: "snapshot-id",
			name: "nightly",
			pipelineName: "training-pipeline",
			stackName: "default",
			authorName: "alice",
			created: new Date("2026-08-22T10:00:00Z"),
		});
	});

	it("falls back to the id for an unnamed snapshot and leaves sparse fields undefined", () => {
		const apiSnapshot = {
			id: "snapshot-id",
			name: null,
			permission_denied: false,
		} satisfies SnapshotDto;

		expect(snapshotFromApi(apiSnapshot)).toEqual({
			id: "snapshot-id",
			name: "snapshot-id",
			pipelineName: undefined,
			stackName: undefined,
			authorName: undefined,
			created: undefined,
		});
	});
});
