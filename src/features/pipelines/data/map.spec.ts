import { describe, expect, it } from "vitest";

import type { PipelineDto } from "./dto";
import { pipelineFromApi } from "./map";

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
		} satisfies PipelineDto;

		expect(pipelineFromApi(apiPipeline)).toEqual({
			id: "pipeline-id",
			name: "training-pipeline",
			description: "Trains the model",
			created: new Date("2026-08-22T10:00:00Z"),
		});
	});

	it("leaves out the optional fields a sparse response omits", () => {
		const apiPipeline = {
			id: "pipeline-id",
			name: "training-pipeline",
			permission_denied: false,
			metadata: { description: null },
		} satisfies PipelineDto;

		expect(pipelineFromApi(apiPipeline)).toEqual({
			id: "pipeline-id",
			name: "training-pipeline",
			description: undefined,
			created: undefined,
		});
	});
});
