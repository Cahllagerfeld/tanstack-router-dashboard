import { beforeEach, describe, expect, it, vi } from "vitest";

import { projectKeys, projectQueries } from "./index";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

describe("projectQueries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("keeps list parameters in the cache identity", () => {
		expect(
			projectQueries.list({ name: "contains:fraud", page: 2 }).queryKey
		).toEqual([
			"projects",
			"list",
			{
				name: "contains:fraud",
				page: 2,
				size: 100,
				sort_by: "desc:created",
			},
		]);
	});

	it("requests and maps a Project list", async () => {
		get.mockResolvedValue({
			data: {
				index: 1,
				max_size: 10,
				total: 1,
				total_pages: 1,
				items: [
					{
						id: "project-id",
						name: "fraud-detection",
						permission_denied: false,
						body: {
							created: "2026-08-20T10:00:00Z",
							updated: "2026-08-21T10:00:00Z",
							display_name: "Fraud Detection",
						},
					},
				],
			},
			error: undefined,
			response: new Response(),
		});

		const query = projectQueries.list({ page: 1 });
		await expect(query.queryFn!({} as never)).resolves.toMatchObject({
			items: [
				{
					id: "project-id",
					name: "fraud-detection",
					displayName: "Fraud Detection",
				},
			],
		});
		expect(get).toHaveBeenCalledWith("/api/v1/projects", {
			params: {
				query: { page: 1, size: 100, sort_by: "desc:created" },
			},
		});
	});

	describe("allList", () => {
		function pageOf(ids: string[], totalPages: number) {
			return {
				data: {
					index: 1,
					max_size: 100,
					total: ids.length,
					total_pages: totalPages,
					items: ids.map((id) => ({
						id,
						name: id,
						permission_denied: false,
					})),
				},
				error: undefined,
				response: new Response(),
			};
		}

		it("collects every page in order", async () => {
			get
				.mockResolvedValueOnce(pageOf(["newest"], 2))
				.mockResolvedValueOnce(pageOf(["oldest"], 2));

			const { items } = await projectQueries.allList().queryFn!({} as never);

			expect(items.map((project) => project.id)).toEqual(["newest", "oldest"]);
			expect(get).toHaveBeenLastCalledWith("/api/v1/projects", {
				params: {
					query: { page: 2, size: 100, sort_by: "desc:created" },
				},
			});
		});

		it("stops after one request when no Projects exist", async () => {
			get.mockResolvedValue(pageOf([], 0));

			await expect(
				projectQueries.allList().queryFn!({} as never)
			).resolves.toEqual({ items: [] });
			expect(get).toHaveBeenCalledOnce();
		});

		it("drops a Project repeated by a shifted page", async () => {
			get
				.mockResolvedValueOnce(pageOf(["newest", "shifted"], 2))
				.mockResolvedValueOnce(pageOf(["shifted", "oldest"], 2));

			const { items } = await projectQueries.allList().queryFn!({} as never);

			expect(items.map((project) => project.id)).toEqual([
				"newest",
				"shifted",
				"oldest",
			]);
		});

		it("rejects instead of publishing part of the list", async () => {
			get
				.mockResolvedValueOnce(pageOf(["newest"], 2))
				.mockRejectedValueOnce(new Error("page 2 failed"));

			await expect(
				projectQueries.allList().queryFn!({} as never)
			).rejects.toThrow("page 2 failed");
		});

		it("is covered by Project invalidation", () => {
			expect(projectQueries.allList().queryKey[0]).toBe(projectKeys.all[0]);
		});
	});

	it("isolates Project details and uses the identifier in the request", async () => {
		get.mockResolvedValue({
			data: {
				id: "project-id",
				name: "fraud-detection",
				permission_denied: true,
			},
			error: undefined,
			response: new Response(),
		});

		const query = projectQueries.detail("project-id");
		expect(query.queryKey).toEqual(projectKeys.detail("project-id"));
		await expect(query.queryFn!({} as never)).resolves.toMatchObject({
			id: "project-id",
			displayName: "fraud-detection",
		});
		expect(get).toHaveBeenCalledWith("/api/v1/projects/{project_name_or_id}", {
			params: { path: { project_name_or_id: "project-id" } },
		});
	});
});
