import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchUserList } from "./fetch-list";
import { userQueries } from "./index";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

const apiUser = {
	id: "user-id",
	name: "ada",
	permission_denied: true,
};

describe("userQueries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("keeps list parameters in the cache identity", () => {
		expect(userQueries.list({ page: 2 }).queryKey).toEqual([
			"users",
			"list",
			{ page: 2, sort_by: "desc:created" },
		]);
	});
});

describe("user requests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("requests and maps a filtered user list", async () => {
		get.mockResolvedValue({
			data: {
				index: 1,
				max_size: 10,
				total: 1,
				total_pages: 1,
				items: [apiUser],
			},
			error: undefined,
			response: new Response(),
		});

		await expect(
			fetchUserList({ name: "contains:ada" })
		).resolves.toMatchObject({
			items: [{ id: "user-id", resolvedName: "ada" }],
		});
		expect(get).toHaveBeenCalledWith("/api/v1/users", {
			params: { query: { name: "contains:ada" } },
		});
	});
});
