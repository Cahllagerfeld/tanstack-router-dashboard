import { beforeEach, describe, expect, it, vi } from "vitest";

import { stackKeys, stackQueries } from "./index";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("../api-client", () => ({ apiClient: { GET: get } }));

describe("stackQueries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("includes filters in the Stack list identity", () => {
		expect(
			stackQueries.list({ name: "contains:prod", page: 2 }).queryKey
		).toEqual([
			"stacks",
			"list",
			{ name: "contains:prod", page: 2, sort_by: "desc:created" },
		]);
	});

	it("requests and maps a Stack detail", async () => {
		get.mockResolvedValue({
			data: {
				id: "stack-id",
				name: "production",
				permission_denied: true,
			},
			error: undefined,
			response: new Response(),
		});

		const query = stackQueries.detail("stack-id");
		expect(query.queryKey).toEqual(stackKeys.detail("stack-id"));
		await expect(query.queryFn!({} as never)).resolves.toMatchObject({
			id: "stack-id",
			name: "production",
		});
		expect(get).toHaveBeenCalledWith("/api/v1/stacks/{stack_id}", {
			params: { path: { stack_id: "stack-id" } },
		});
	});
});
