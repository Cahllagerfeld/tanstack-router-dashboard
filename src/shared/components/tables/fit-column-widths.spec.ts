import { expect, test } from "vitest";

import { fitColumnWidths } from "./fit-column-widths";

const select = { size: 32, fixed: true };
const actions = { size: 80, fixed: true };

test("only flexible columns absorb the spare width, in proportion", () => {
	expect(
		fitColumnWidths(
			[
				select,
				{ size: 300, fixed: false },
				{ size: 100, fixed: false },
				actions,
			],
			912
		)
	).toEqual([32, 600, 200, 80]);
});

test("a narrower table keeps every size and overflows instead of shrinking", () => {
	expect(fitColumnWidths([{ size: 300, fixed: false }, actions], 200)).toEqual([
		300, 80,
	]);
});

test("an unmeasured table keeps every size", () => {
	expect(fitColumnWidths([select, { size: 300, fixed: false }], 0)).toEqual([
		32, 300,
	]);
});

test("a table of only fixed columns keeps their sizes", () => {
	expect(fitColumnWidths([select, actions], 1000)).toEqual([32, 80]);
});
