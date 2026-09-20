import { describe, expect, it } from "vitest";

import type { components } from "@/shared/api/generated";

import { formatRunIndex, formatRunStatus, runFromApi } from "./runs";

describe("runFromApi", () => {
	it("maps the fields needed by the Run table", () => {
		const apiRun = {
			id: "run-id",
			name: "training-run",
			permission_denied: false,
			body: {
				created: "2026-08-22T10:00:00Z",
				updated: "2026-08-22T10:05:00Z",
				project_id: "project-id",
				status: "completed",
				in_progress: false,
				index: 7,
			},
			resources: {
				pipeline: {
					id: "pipeline-id",
					name: "training-pipeline",
					permission_denied: true,
				},
				stack: {
					id: "stack-id",
					name: "production",
					permission_denied: true,
				},
				user: {
					id: "user-id",
					name: "ada",
					permission_denied: true,
				},
				tags: [],
				visualizations: [],
			},
		} satisfies components["schemas"]["PipelineRunResponse"];

		expect(runFromApi(apiRun)).toEqual({
			id: "run-id",
			index: 7,
			status: "completed",
			pipelineName: "training-pipeline",
			stackName: "production",
			authorName: "ada",
			created: new Date("2026-08-22T10:00:00Z"),
		});
	});

	it("keeps unavailable relations and body fields optional", () => {
		expect(
			runFromApi({
				id: "restricted-run",
				name: "restricted",
				permission_denied: true,
			})
		).toEqual({
			id: "restricted-run",
			index: undefined,
			status: undefined,
			pipelineName: undefined,
			stackName: undefined,
			authorName: undefined,
			created: undefined,
		});
	});
});

describe("Run presentation helpers", () => {
	it("zero-pads Run indexes to at least four digits", () => {
		expect(formatRunIndex(7)).toBe("#0007");
		expect(formatRunIndex(12345)).toBe("#12345");
	});

	it("turns backend status text into a display label", () => {
		expect(formatRunStatus("retrying_after_failure")).toBe(
			"Retrying After Failure"
		);
	});
});
