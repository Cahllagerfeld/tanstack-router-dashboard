import { describe, expect, it } from "vitest";
import { maskSecretValues } from "./secrets";

describe("maskSecretValues", () => {
	it("returns an empty object for empty or missing values", () => {
		expect(maskSecretValues(undefined)).toEqual({});
		expect(maskSecretValues(null)).toEqual({});
		expect(maskSecretValues({})).toEqual({});
	});

	it("masks a single key", () => {
		expect(maskSecretValues({ API_KEY: "secret" })).toEqual({
			API_KEY: "••••••",
		});
	});

	it("masks multiple keys", () => {
		expect(
			maskSecretValues({
				FOO: "a",
				BAR: 2,
				BAZ: { nested: true },
			})
		).toEqual({
			FOO: "••••••",
			BAR: "••••••",
			BAZ: "••••••",
		});
	});
});
