import { pipelineFromApi } from "./pipelines";
import type { components } from "@/types/core";
import { describe, expect, it } from "vitest";

describe("pipelineFromApi", () => {
	it("exposes the fields needed by the Pipeline table", () => {
		const apiPipeline = {
			id: "pipeline-id",
			name: "training-pipeline",
			permission_denied: false,
			body: {
				created: "2026-08-22T10:00:00Z",
				updated: "2026-08-22T10:00:00Z",
				project_id: "project-id",
			},
			metadata: {
				description: "Trains the model",
			},
		} satisfies components["schemas"]["PipelineResponse"];

		expect(pipelineFromApi(apiPipeline)).toEqual({
			id: "pipeline-id",
			name: "training-pipeline",
			description: "Trains the model",
			created: new Date("2026-08-22T10:00:00Z"),
		});
	});
});
