import { QueryClient } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FetchError } from "@/shared/api/errors";

import { ensureCurrentIdentity, sessionQueries } from "./queries";

const { fetchCurrentIdentity } = vi.hoisted(() => ({
	fetchCurrentIdentity: vi.fn(),
}));

vi.mock("./requests", () => ({ fetchCurrentIdentity }));

const identity = {
	id: "user-id",
	resolvedName: "Ada",
	email: undefined,
	isAdmin: true,
};

describe("current identity", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("keeps the cache identity every caller shares", () => {
		expect(sessionQueries.currentIdentity().queryKey).toEqual([
			"users",
			"current",
		]);
	});

	it("lets a guard pass once and reuses the cached identity", async () => {
		fetchCurrentIdentity.mockResolvedValue(identity);
		const queryClient = new QueryClient();

		await expect(ensureCurrentIdentity(queryClient)).resolves.toBe(identity);
		await expect(ensureCurrentIdentity(queryClient)).resolves.toBe(identity);

		expect(fetchCurrentIdentity).toHaveBeenCalledOnce();
	});

	it("rejects the guard when nobody is signed in", async () => {
		const unauthorized = new FetchError({
			status: 401,
			statusText: "Unauthorized",
			message: "Not authenticated",
		});
		fetchCurrentIdentity.mockRejectedValue(unauthorized);
		const queryClient = new QueryClient({
			defaultOptions: { queries: { retry: false } },
		});

		await expect(ensureCurrentIdentity(queryClient)).rejects.toBe(unauthorized);
	});
});
