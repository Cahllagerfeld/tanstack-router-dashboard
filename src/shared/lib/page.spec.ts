import { describe, expect, it } from "vitest";

import { getPageRange, mapPage } from "./page";

describe("mapPage", () => {
	it("maps the items and keeps the pagination", () => {
		const page = {
			index: 2,
			max_size: 20,
			total: 22,
			total_pages: 2,
			items: [1, 2],
		};

		expect(mapPage(page, String)).toEqual({ ...page, items: ["1", "2"] });
	});
});

describe("getPageRange", () => {
	it("covers a full page", () => {
		expect(getPageRange({ index: 2, max_size: 20, total: 50 })).toEqual({
			start: 21,
			end: 40,
		});
	});

	it("stops at the total on the last page", () => {
		expect(getPageRange({ index: 3, max_size: 20, total: 50 })).toEqual({
			start: 41,
			end: 50,
		});
	});

	it("stays within the total when the page is past the end", () => {
		expect(getPageRange({ index: 9, max_size: 20, total: 50 })).toEqual({
			start: 50,
			end: 50,
		});
	});
});
