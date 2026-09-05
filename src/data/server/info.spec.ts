import { describe, expect, it, vi } from "vitest";

import { fetchServerInfo } from "./info";

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock("@/shared/api/client", () => ({ apiClient: { GET: get } }));

describe("fetchServerInfo", () => {
	it("returns the server information from the API", async () => {
		const info = { version: "1.2.3", debug: false };
		get.mockResolvedValue({
			data: info,
			error: undefined,
			response: new Response(),
		});

		await expect(fetchServerInfo()).resolves.toBe(info);
		expect(get).toHaveBeenCalledWith("/api/v1/info");
	});
});
