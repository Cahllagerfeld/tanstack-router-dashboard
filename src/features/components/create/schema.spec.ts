import { describe, expect, it } from "vitest";

import { createComponentSearchSchema } from "./schema";

const flavorId = "2afefb84-e393-45a9-8531-c12dd540c9b8";

describe("createComponentSearchSchema", () => {
	it("keeps a valid type and Flavor id", () => {
		expect(
			createComponentSearchSchema.parse({
				type: "orchestrator",
				flavor: flavorId,
			})
		).toEqual({ type: "orchestrator", flavor: flavorId });
	});

	it("starts at the first step without search", () => {
		expect(createComponentSearchSchema.parse({})).toEqual({});
	});

	it("drops an unknown type and a malformed Flavor id", () => {
		expect(
			createComponentSearchSchema.parse({ type: "toaster", flavor: "local" })
		).toEqual({ type: undefined, flavor: undefined });
	});
});
