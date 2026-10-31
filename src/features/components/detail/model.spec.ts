import { describe, expect, it } from "vitest";

import { getLabelTags } from "./model";

describe("getLabelTags", () => {
	it("shows each label's key and value", () => {
		expect(getLabelTags({ team: "platform", replicas: 3 })).toEqual([
			"team: platform",
			"replicas: 3",
		]);
	});

	it("shows only the key for a label without a value", () => {
		expect(getLabelTags({ production: null, gpu: "" })).toEqual([
			"production",
			"gpu",
		]);
	});

	it("returns no tags when the backend sends no labels", () => {
		expect(getLabelTags(undefined)).toEqual([]);
	});
});
