import { describe, expect, it } from "vitest";

import { getPageNumbers } from "./page-numbers";

describe("getPageNumbers", () => {
	describe("small pagination (≤3 pages)", () => {
		it("returns all pages when there's only 1 page", () => {
			expect(getPageNumbers(1, 1)).toEqual([1]);
		});

		it("returns all pages when there are 2 pages", () => {
			expect(getPageNumbers(2, 1)).toEqual([1, 2]);
			expect(getPageNumbers(2, 2)).toEqual([1, 2]);
		});

		it("returns all pages when there are 3 pages", () => {
			expect(getPageNumbers(3, 1)).toEqual([1, 2, 3]);
			expect(getPageNumbers(3, 2)).toEqual([1, 2, 3]);
			expect(getPageNumbers(3, 3)).toEqual([1, 2, 3]);
		});
	});

	describe("large pagination (>3 pages)", () => {
		it("shows current page with adjacent pages when in the middle", () => {
			expect(getPageNumbers(10, 5)).toEqual([4, 5, 6]);
			expect(getPageNumbers(100, 50)).toEqual([49, 50, 51]);
		});

		it("shows first 3 pages when on page 1", () => {
			expect(getPageNumbers(10, 1)).toEqual([1, 2, 3]);
			expect(getPageNumbers(100, 1)).toEqual([1, 2, 3]);
		});

		it("shows last 3 pages when on the last page", () => {
			expect(getPageNumbers(10, 10)).toEqual([8, 9, 10]);
			expect(getPageNumbers(100, 100)).toEqual([98, 99, 100]);
		});

		it("handles edge case when on page 2", () => {
			expect(getPageNumbers(10, 2)).toEqual([1, 2, 3]);
		});

		it("handles edge case when on second-to-last page", () => {
			expect(getPageNumbers(10, 9)).toEqual([8, 9, 10]);
		});
	});

	describe("boundary conditions", () => {
		it("handles 4 pages correctly", () => {
			expect(getPageNumbers(4, 1)).toEqual([1, 2, 3]);
			expect(getPageNumbers(4, 2)).toEqual([1, 2, 3]);
			expect(getPageNumbers(4, 3)).toEqual([2, 3, 4]);
			expect(getPageNumbers(4, 4)).toEqual([2, 3, 4]);
		});

		it("handles 5 pages correctly", () => {
			expect(getPageNumbers(5, 1)).toEqual([1, 2, 3]);
			expect(getPageNumbers(5, 2)).toEqual([1, 2, 3]);
			expect(getPageNumbers(5, 3)).toEqual([2, 3, 4]);
			expect(getPageNumbers(5, 4)).toEqual([3, 4, 5]);
			expect(getPageNumbers(5, 5)).toEqual([3, 4, 5]);
		});

		it("handles invalid inputs gracefully", () => {
			expect(getPageNumbers(0, 1)).toEqual([]);
			expect(getPageNumbers(-1, 1)).toEqual([]);
			expect(getPageNumbers(5, 0)).toEqual([0, 1]);
			expect(getPageNumbers(5, -1)).toEqual([-1, 0]);
			expect(getPageNumbers(5, 10)).toEqual([9, 10]);
		});
	});

	describe("return value properties", () => {
		it("always returns an array", () => {
			expect(Array.isArray(getPageNumbers(10, 5))).toBe(true);
		});

		it("returns at most 3 pages for large pagination", () => {
			for (let totalPages = 4; totalPages <= 10; totalPages++) {
				for (let index = 1; index <= totalPages; index++) {
					const result = getPageNumbers(totalPages, index);
					expect(result.length).toBeLessThanOrEqual(3);
				}
			}
		});

		it("returns exactly totalPages for small pagination", () => {
			expect(getPageNumbers(1, 1).length).toBe(1);
			expect(getPageNumbers(2, 1).length).toBe(2);
			expect(getPageNumbers(3, 1).length).toBe(3);
		});

		it("returns only positive integers", () => {
			const result = getPageNumbers(10, 5);
			result.forEach((page) => {
				expect(Number.isInteger(page)).toBe(true);
				expect(page).toBeGreaterThan(0);
			});
		});

		it("returns pages in ascending order", () => {
			const result = getPageNumbers(10, 5);
			for (let i = 1; i < result.length; i++) {
				expect(result[i]).toBeGreaterThan(result[i - 1]);
			}
		});
	});
});
