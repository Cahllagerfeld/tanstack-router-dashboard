import { beforeEach, describe, expect, it, vi } from "vitest";

import { componentKeys, componentQueries } from "./index";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("../api-client", () => ({ apiClient: { GET: get } }));

describe("componentQueries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("includes filters in the Component list identity", () => {
		expect(
			componentQueries.list({
				project_name_or_id: "project-id",
				type: "orchestrator",
			}).queryKey
		).toEqual([
			"components",
			"list",
			{
				project_name_or_id: "project-id",
				type: "orchestrator",
				sort_by: "desc:created",
			},
		]);
	});

	it("requests and maps a Component detail", async () => {
		get.mockResolvedValue({
			data: {
				id: "component-id",
				name: "local-store",
				permission_denied: true,
			},
			error: undefined,
			response: new Response(),
		});

		const query = componentQueries.detail("component-id");
		expect(query.queryKey).toEqual(componentKeys.detail("component-id"));
		await expect(query.queryFn!({} as never)).resolves.toMatchObject({
			id: "component-id",
			name: "local-store",
		});
		expect(get).toHaveBeenCalledWith("/api/v1/components/{component_id}", {
			params: { path: { component_id: "component-id" } },
		});
	});
});
