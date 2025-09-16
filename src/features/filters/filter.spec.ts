import { describe, expect, it } from "vitest";
import {
	FILTER_OPTIONS,
	createFilter,
	filterSchema,
	getFilterValue,
} from "./filter";

describe("createFilter", () => {
	it("builds the correct Filter string", () => {
		expect(createFilter("equals", "name")).toBe("equals:name");
		expect(createFilter("contains", "a:b:c")).toBe("contains:a:b:c");
	});
});

describe("getFilterValue", () => {
	it("returns everything after the first colon, preserving colons", () => {
		expect(getFilterValue("equals:name")).toBe("name");
		expect(getFilterValue("contains:a:b:c")).toBe("a:b:c");
	});
});

describe("filterSchema", () => {
	it("accepts all valid options with a non-empty value", () => {
		for (const option of FILTER_OPTIONS) {
			const parsed = filterSchema.safeParse(`${option}:value`);
			expect(parsed.success).toBe(true);
		}
	});

	it("rejects invalid option or missing value", () => {
		expect(filterSchema.safeParse("invalid:whatever").success).toBe(false);
		expect(filterSchema.safeParse("equals:").success).toBe(false);
		expect(filterSchema.safeParse(":value").success).toBe(false);
	});
});
