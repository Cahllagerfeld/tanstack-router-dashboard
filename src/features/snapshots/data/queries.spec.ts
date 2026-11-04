import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { snapshotKeys, snapshotQueries } from "./queries";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

describe("snapshotQueries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("uses an isolated cache namespace", () => {
		expect(snapshotKeys.all).toEqual(["snapshots"]);
	});

	it("keeps the Project, page, and size in the list query identity", () => {
		expect(
			snapshotQueries.list({ project: "project-id", page: 2, size: 10 })
				.queryKey
		).toEqual([
			"snapshots",
			"list",
			{
				sort_by: "desc:created",
				named_only: true,
				project: "project-id",
				page: 2,
				size: 10,
			},
		]);
	});

	it("requests the newest-first list of named Project snapshots and maps it", async () => {
		get.mockResolvedValue({
			data: {
				index: 1,
				max_size: 10,
				total: 1,
				total_pages: 1,
				items: [
					{ id: "snapshot-id", name: "nightly", permission_denied: false },
				],
			},
			error: undefined,
			response: new Response(),
		});

		const query = snapshotQueries.list({ project: "project-id", page: 3 });
		await expect(query.queryFn!({} as never)).resolves.toMatchObject({
			items: [{ id: "snapshot-id", name: "nightly" }],
		});
		expect(get).toHaveBeenCalledWith("/api/v1/pipeline_snapshots", {
			params: {
				query: {
					project: "project-id",
					page: 3,
					named_only: true,
					sort_by: "desc:created",
				},
			},
		});
	});

	it("rejects a failed request", async () => {
		get.mockResolvedValue({
			data: undefined,
			error: { detail: "Project not found" },
			response: new Response(null, { status: 404 }),
		});

		const query = snapshotQueries.list({ project: "project-id" });
		await expect(query.queryFn!({} as never)).rejects.toThrow(
			m.common_error_unwrapping()
		);
	});
});
