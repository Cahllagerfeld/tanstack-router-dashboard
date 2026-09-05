import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProject } from "./create-project";

const { post } = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("../../api-client", () => ({ apiClient: { POST: post } }));

describe("createProject", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("creates and maps a Project", async () => {
		post.mockResolvedValue({
			data: {
				id: "project-id",
				name: "fraud-detection",
				permission_denied: false,
				body: {
					created: "2026-08-20T10:00:00Z",
					updated: "2026-08-21T10:00:00Z",
					display_name: "Fraud Detection",
				},
			},
			error: undefined,
			response: new Response(),
		});

		await expect(
			createProject({
				name: "fraud-detection",
				display_name: "Fraud Detection",
				description: "Detect suspicious transactions",
			})
		).resolves.toEqual({
			id: "project-id",
			name: "fraud-detection",
			displayName: "Fraud Detection",
		});
		expect(post).toHaveBeenCalledWith("/api/v1/projects", {
			method: "POST",
			body: {
				name: "fraud-detection",
				display_name: "Fraud Detection",
				description: "Detect suspicious transactions",
			},
		});
	});
});
