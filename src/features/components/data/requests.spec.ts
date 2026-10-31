import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { deleteComponent } from "./requests";

const { deleteRequest } = vi.hoisted(() => ({ deleteRequest: vi.fn() }));

vi.mock("@/shared/api/client", () => ({
	apiClient: { DELETE: deleteRequest },
}));

describe("deleteComponent", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("deletes the selected Component", async () => {
		deleteRequest.mockResolvedValue({
			data: null,
			error: undefined,
			response: new Response("null", { status: 200 }),
		});

		await expect(
			deleteComponent({ componentId: "component-id" })
		).resolves.toBeUndefined();
		expect(deleteRequest).toHaveBeenCalledWith(
			"/api/v1/components/{component_id}",
			{ params: { path: { component_id: "component-id" } } }
		);
	});

	it("rejects an unsuccessful deletion", async () => {
		deleteRequest.mockResolvedValue({
			data: undefined,
			error: { detail: "Forbidden" },
			response: new Response(null, { status: 403 }),
		});

		await expect(
			deleteComponent({ componentId: "component-id" })
		).rejects.toThrow(m.common_error_unwrapping());
	});
});
