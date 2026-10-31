import { describe, expect, it } from "vitest";

import { getProjectLabel } from "./model";

describe("getProjectLabel", () => {
	it("prefers the display name", () => {
		expect(
			getProjectLabel({ id: "id", name: "fraud", displayName: "Fraud" })
		).toBe("Fraud");
	});

	it("falls back to the name", () => {
		expect(
			getProjectLabel({ id: "id", name: "fraud", displayName: undefined })
		).toBe("fraud");
	});
});
