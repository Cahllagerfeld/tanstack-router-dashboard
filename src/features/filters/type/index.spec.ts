import { describe, expect, it } from "vitest";

import { typeFilterSchema } from "./index";

describe("typeFilterSchema", () => {
	it("accepts a known Component type or no filter", () => {
		expect(typeFilterSchema.parse("orchestrator")).toBe("orchestrator");
		expect(typeFilterSchema.parse(undefined)).toBeUndefined();
	});

	it("rejects an unknown Component type", () => {
		expect(typeFilterSchema.safeParse("database").success).toBe(false);
	});
});
