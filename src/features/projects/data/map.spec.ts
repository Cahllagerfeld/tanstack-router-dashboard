import { describe, expect, it } from "vitest";

import { projectFromApi } from "./map";

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
