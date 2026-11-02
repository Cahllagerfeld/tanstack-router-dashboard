import { describe, expect, it } from "vitest";

import { formatDateTime, parseBackendDate } from "./dates";

describe("parseBackendDate", () => {
	it("treats a backend date without a zone as UTC", () => {
		expect(parseBackendDate("2026-08-20T10:00:00")).toEqual(
			new Date("2026-08-20T10:00:00Z")
		);
	});

	it("keeps an explicit UTC date", () => {
		expect(parseBackendDate("2026-08-20T10:00:00Z")).toEqual(
			new Date("2026-08-20T10:00:00Z")
		);
	});
});

describe("formatDateTime", () => {
	const date = new Date("2026-08-20T14:05:30Z");

	it("shows the month as text and the locale's clock, without seconds", () => {
		expect(formatDateTime(date, "en", "UTC")).toBe("Aug 20, 2026, 2:05 PM");
		expect(formatDateTime(date, "de", "UTC")).toBe("20. Aug. 2026, 14:05");
	});
});
