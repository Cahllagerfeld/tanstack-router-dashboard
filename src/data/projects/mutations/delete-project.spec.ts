import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { deleteProject } from "./delete-project";

const { deleteRequest } = vi.hoisted(() => ({ deleteRequest: vi.fn() }));

vi.mock("@/data/api-client", () => ({
	apiClient: { DELETE: deleteRequest },
}));

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
