import { describe, expect, it, vi } from "vitest";

// Mock the storage base URL used by images.ts
vi.mock("./constants/storage", () => ({
	S3_BASE_URL: "https://example.test",
}));

import { getIllustrationUrl } from "./images";

describe("getIllustrationUrl", () => {
	it("uses the configured S3_BASE_URL and correct path/extension", () => {
		const url = getIllustrationUrl("alpha");
		expect(url.startsWith("https://example.test/projects/")).toBe(true);
		expect(url.endsWith(".jpg")).toBe(true);
	});

	it("is deterministic for the same name and number is within 1..49", () => {
		const first = getIllustrationUrl("alpha");
		const second = getIllustrationUrl("alpha");
		expect(first).toBe(second);

		const match = first.match(/\/projects\/(\d+)\.jpg$/);
		expect(match).not.toBeNull();
		const n = Number(match?.[1]);
		expect(Number.isNaN(n)).toBe(false);
		expect(n).toBeGreaterThanOrEqual(1);
		expect(n).toBeLessThanOrEqual(49);
	});
});
