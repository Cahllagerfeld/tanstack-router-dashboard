import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { fetchRunList } from "./requests";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

describe("fetchRunList", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("maps Runs and keeps the page contract", async () => {
		get.mockResolvedValue({
			data: {
				index: 2,
				max_size: 20,
				total: 21,
				total_pages: 2,
				items: [
					{
						id: "run-id",
						name: "training-run",
						permission_denied: false,
						body: { index: 21, status: "running" },
						resources: { user: { name: "ada" } },
					},
				],
			},
			error: undefined,
			response: new Response(),
		});

		await expect(
			fetchRunList({ project: "project-id", page: 2, size: 20 })
		).resolves.toEqual({
			index: 2,
			max_size: 20,
			total: 21,
			total_pages: 2,
			items: [expect.objectContaining({ id: "run-id", authorName: "ada" })],
		});
	});

	it("rejects a response without a page instead of showing no Runs", async () => {
		get.mockResolvedValue({
			data: undefined,
			error: undefined,
			response: new Response(),
		});

		await expect(fetchRunList({ project: "project-id" })).rejects.toThrow(
			m.common_error_unwrapping()
		);
	});
});
