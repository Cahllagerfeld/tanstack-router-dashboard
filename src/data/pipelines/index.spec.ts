import { beforeEach, describe, expect, it, vi } from "vitest";

import { pipelineKeys, pipelineQueries } from "./index";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("../api-client", () => ({ apiClient: { GET: get } }));

describe("pipelineQueries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("uses an isolated cache namespace", () => {
		expect(pipelineKeys.all).toEqual(["pipelines"]);
	});

	it("includes the Project filter in the list query identity", () => {
		expect(pipelineQueries.list({ project: "project-name" }).queryKey).toEqual([
			"pipelines",
			"list",
			{ sort_by: "desc:created", project: "project-name" },
		]);
	});

	it("requests and maps the Project-scoped Pipeline list", async () => {
		get.mockResolvedValue({
			data: {
				index: 1,
				max_size: 10,
				total: 1,
				total_pages: 1,
				items: [
					{
						id: "pipeline-id",
						name: "training-pipeline",
						permission_denied: false,
						body: {
							created: "2026-08-20T10:00:00Z",
							updated: "2026-08-21T10:00:00Z",
							project_id: "project-id",
						},
						metadata: { description: "Train a model" },
					},
				],
			},
			error: undefined,
			response: new Response(),
		});

		const query = pipelineQueries.list({ project: "project-id" });
		await expect(query.queryFn!({} as never)).resolves.toMatchObject({
			items: [
				{
					id: "pipeline-id",
					name: "training-pipeline",
					description: "Train a model",
				},
			],
		});
		expect(get).toHaveBeenCalledWith("/api/v1/pipelines", {
			params: {
				query: { project: "project-id", sort_by: "desc:created" },
			},
		});
	});
});
