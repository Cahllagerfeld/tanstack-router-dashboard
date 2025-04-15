import { describe, expect, test } from "vitest";
import { buildUrlWithQueries } from "./url";

describe("url utilities", () => {
	test("buildUrlWithQueries", () => {
		const url = buildUrlWithQueries("https://example.com", {
			foo: "bar",
			baz: 1,
		});
		expect(url).toBe("https://example.com?foo=bar&baz=1");
	});
});
