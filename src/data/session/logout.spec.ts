import { beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "@/paraglide/messages";

import { logoutUserRequest } from "./logout";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

describe("logoutUserRequest", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("ends the server session and returns its response", async () => {
		const result = { logged_out: true };
		get.mockResolvedValue({
			data: result,
			error: undefined,
			response: new Response(),
		});

		await expect(logoutUserRequest()).resolves.toBe(result);
		expect(get).toHaveBeenCalledWith("/api/v1/logout", {});
	});

	it("rejects an unsuccessful logout response", async () => {
		get.mockResolvedValue({
			data: undefined,
			error: { detail: "Session unavailable" },
			response: new Response(null, { status: 503 }),
		});

		await expect(logoutUserRequest()).rejects.toThrow(
			m.common_error_unwrapping()
		);
	});
});
