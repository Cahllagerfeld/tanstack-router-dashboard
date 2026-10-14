import { beforeEach, describe, expect, it, vi } from "vitest";

import { runQueries } from "./index";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

describe("runQueries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("includes Project scope and pagination in the query identity", () => {
		expect(
			runQueries.list({ project: "project-a", page: 2, size: 20 }).queryKey
		).toEqual([
			"runs",
			"list",
			{
				project: "project-a",
				page: 2,
				size: 20,
				sort_by: "desc:created",
			},
		]);

		expect(
			runQueries.list({ project: "project-b", page: 1, size: 20 }).queryKey
		).not.toEqual(
			runQueries.list({ project: "project-a", page: 1, size: 20 }).queryKey
		);
	});

	it("retains generated query parameters and keeps hydration opt-in", async () => {
		get.mockResolvedValue({
			data: {
				index: 3,
				max_size: 50,
				total: 0,
				total_pages: 3,
				items: [],
			},
			error: undefined,
			response: new Response(),
		});

		const query = runQueries.list({
			project: "project-id",
			page: 3,
			size: 50,
			status: ["completed", "failed"],
			include_full_metadata: false,
		});
		await expect(query.queryFn!({} as never)).resolves.toMatchObject({
			index: 3,
			total_pages: 3,
			items: [],
		});
		expect(get).toHaveBeenCalledWith("/api/v1/runs", {
			params: {
				query: {
					project: "project-id",
					page: 3,
					size: 50,
					status: ["completed", "failed"],
					include_full_metadata: false,
					sort_by: "desc:created",
				},
			},
		});
		expect(get.mock.calls[0]?.[1].params.query).not.toHaveProperty("hydrate");
	});

	it("preserves explicit sorting and hydration", async () => {
		get.mockResolvedValue({
			data: {
				index: 1,
				max_size: 10,
				total: 0,
				total_pages: 1,
				items: [],
			},
			error: undefined,
			response: new Response(),
		});

		const query = runQueries.list({
			project: "project-id",
			sort_by: "asc:name",
			hydrate: true,
		});
		await query.queryFn!({} as never);

		expect(get).toHaveBeenCalledWith("/api/v1/runs", {
			params: {
				query: {
					project: "project-id",
					sort_by: "asc:name",
					hydrate: true,
				},
			},
		});
	});
});
