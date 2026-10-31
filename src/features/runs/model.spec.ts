import { describe, expect, it } from "vitest";

import { formatRunIndex, formatRunStatus } from "./model";

describe("Run presentation helpers", () => {
	it("zero-pads Run indexes to at least four digits", () => {
		expect(formatRunIndex(7)).toBe("#0007");
		expect(formatRunIndex(12345)).toBe("#12345");
	});

	it("turns backend status text into a display label", () => {
		expect(formatRunStatus("retrying_after_failure")).toBe(
			"Retrying After Failure"
		);
	});
});
