import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchCurrentUser } from "./fetch-current-user";
import { fetchUserList } from "./fetch-list";
import { userKeys, userQueries } from "./index";

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

	it("keeps list parameters and the current user in separate cache identities", () => {
		expect(userQueries.list({ page: 2 }).queryKey).toEqual([
			"users",
			"list",
			{ page: 2, sort_by: "desc:created" },
		]);
		expect(userQueries.currentUser().queryKey).toEqual(userKeys.current());
	});
});

describe("user requests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches and maps the current user", async () => {
		get.mockResolvedValue({
			data: apiUser,
			error: undefined,
			response: new Response(),
		});

		await expect(fetchCurrentUser()).resolves.toMatchObject({
			id: "user-id",
			resolvedName: "ada",
		});
		expect(get).toHaveBeenCalledWith("/api/v1/current-user");
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
