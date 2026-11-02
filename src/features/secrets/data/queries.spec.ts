import { beforeEach, describe, expect, it, vi } from "vitest";

import { secretQueries } from "./queries";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

describe("secretQueries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("keeps pagination in the Secret list identity and request", async () => {
		get.mockResolvedValue({
			data: {
				index: 2,
				max_size: 20,
				total: 21,
				total_pages: 2,
				items: [{ id: "secret-id", name: "aws", permission_denied: true }],
			},
			error: undefined,
			response: new Response(),
		});

		const params = {
			page: 2,
			size: 20,
			sort_by: "desc:created",
		};
		const query = secretQueries.list({ page: 2, size: 20 });

		expect(query.queryKey).toEqual(["secrets", "list", params]);
		await expect(query.queryFn!({} as never)).resolves.toMatchObject({
			total: 21,
			items: [{ id: "secret-id", name: "aws" }],
		});
		expect(get).toHaveBeenCalledWith("/api/v1/secrets", {
			params: { query: params },
		});
	});

	it("rejects when the Secret list request fails", async () => {
		get.mockResolvedValue({
			data: undefined,
			error: { detail: "Forbidden" },
			response: new Response(null, { status: 403 }),
		});

		await expect(
			secretQueries.list().queryFn!({} as never)
		).rejects.toBeDefined();
	});
});
