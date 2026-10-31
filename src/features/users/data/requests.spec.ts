import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { fetchUserList } from "./requests";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

describe("fetchUserList", () => {
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
				items: [{ id: "user-id", name: "ada", permission_denied: true }],
			},
			error: undefined,
			response: new Response(),
		});

		await expect(
			fetchUserList({ name: "contains:ada" })
		).resolves.toMatchObject({
			index: 1,
			total: 1,
			items: [{ id: "user-id", resolvedName: "ada" }],
		});
		expect(get).toHaveBeenCalledWith("/api/v1/users", {
			params: { query: { name: "contains:ada" } },
		});
	});

	it("rejects an unsuccessful list response", async () => {
		get.mockResolvedValue({
			data: undefined,
			error: { detail: "Forbidden" },
			response: new Response(null, { status: 403 }),
		});

		await expect(fetchUserList({})).rejects.toThrow(
			m.common_error_unwrapping()
		);
	});
});
