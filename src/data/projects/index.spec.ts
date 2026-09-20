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
				size: 10,
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
				query: { page: 1, size: 10, sort_by: "desc:created" },
			},
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
