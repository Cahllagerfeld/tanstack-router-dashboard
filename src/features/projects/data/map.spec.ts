import { describe, expect, it } from "vitest";

import { projectDetailFromApi, projectFromApi } from "./map";

describe("projectFromApi", () => {
	it("uses the display name supplied by the API", () => {
		expect(
			projectFromApi({
				id: "project-id",
				name: "fraud-detection",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00Z",
					updated: "2026-08-21T10:00:00Z",
					display_name: "Fraud Detection",
				},
			})
		).toEqual({
			id: "project-id",
			name: "fraud-detection",
			displayName: "Fraud Detection",
		});
	});

	it("falls back to the Project name when the response body is unavailable", () => {
		expect(
			projectFromApi({
				id: "project-id",
				name: "fraud-detection",
				permission_denied: true,
			})
		).toMatchObject({ displayName: "fraud-detection" });
	});
});

describe("projectDetailFromApi", () => {
	it("adds the hydrated description", () => {
		expect(
			projectDetailFromApi({
				id: "project-id",
				name: "fraud-detection",
				permission_denied: false,
				metadata: {
					description: "Detect suspicious transactions",
					project_metadata: {},
				},
			})
		).toEqual({
			id: "project-id",
			name: "fraud-detection",
			displayName: "fraud-detection",
			description: "Detect suspicious transactions",
		});
	});

	it("treats an empty or unhydrated description as absent", () => {
		const project = {
			id: "project-id",
			name: "fraud-detection",
			permission_denied: false,
		};

		expect(
			projectDetailFromApi({
				...project,
				metadata: { description: "", project_metadata: {} },
			})
		).toMatchObject({ description: undefined });
		expect(projectDetailFromApi(project)).toMatchObject({
			description: undefined,
		});
	});
});
