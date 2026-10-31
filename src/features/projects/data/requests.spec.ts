import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { createProject, deleteProject } from "./requests";

const { deleteRequest, post } = vi.hoisted(() => ({
	deleteRequest: vi.fn(),
	post: vi.fn(),
}));

vi.mock("@/shared/api/client", () => ({
	apiClient: { DELETE: deleteRequest, POST: post },
}));

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

describe("deleteProject", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("deletes the selected Project", async () => {
		deleteRequest.mockResolvedValue({
			data: undefined,
			error: undefined,
			response: new Response(null, { status: 204 }),
		});

		await expect(
			deleteProject({ projectId: "project-id" })
		).resolves.toBeUndefined();
		expect(deleteRequest).toHaveBeenCalledWith(
			"/api/v1/projects/{project_name_or_id}",
			{ params: { path: { project_name_or_id: "project-id" } } }
		);
	});

	it("rejects an unsuccessful deletion", async () => {
		deleteRequest.mockResolvedValue({
			data: undefined,
			error: { detail: "Project cannot be deleted" },
			response: new Response(null, { status: 409 }),
		});

		await expect(deleteProject({ projectId: "project-id" })).rejects.toThrow(
			m.common_error_unwrapping()
		);
	});
});
