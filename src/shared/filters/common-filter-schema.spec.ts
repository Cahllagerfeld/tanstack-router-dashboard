import { describe, expect, it } from "vitest";

import { commonFilterSchema } from "./common-filter-schema";

describe("commonFilterSchema", () => {
	it("accepts supported pagination values", () => {
		expect(commonFilterSchema.parse({ page: 2, size: 20 })).toEqual({
			page: 2,
			size: 20,
		});
	});

	it("drops invalid pagination values", () => {
		expect(commonFilterSchema.parse({ page: 0, size: 12 })).toEqual({
			page: undefined,
			size: undefined,
		});
		expect(commonFilterSchema.parse({ page: 1.5, size: 10 })).toEqual({
			page: undefined,
			size: 10,
		});
	});
});
